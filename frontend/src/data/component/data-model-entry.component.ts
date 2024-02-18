import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core'
import {Apollo, gql} from 'apollo-angular'
import {NotifyService} from '../../core/service/notify.service'
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {DataModel, DataModelDto, DataModelFieldType, DataStorage} from '../data.type'
import {makeFormDirty} from '../../core/utils/form.utils'
import {finalize} from 'rxjs'
import {
  MutationCreateRequestParameters,
  MutationUpdateRequestParameters,
  QueryPageableRequest,
  QueryPageableResponse,
} from '../../core/type'
import {DATA_MODEL_CREATE_REQUEST, DATA_MODEL_UPDATE_REQUEST} from '../graphql/data-model.graphql'

@Component({
  selector: 'data-model-entry',
  templateUrl: './data-model-entry.component.html',
})
export class DataModelEntryComponent implements OnInit, OnChanges {
  constructor(
    private apollo: Apollo,
    private notify: NotifyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.mapToForm({} as DataModel)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[NGCHange]', changes)
    const value = (changes?.['item']?.currentValue || {}) as DataModel
    this?.mapToForm(value)
  }

  mapToForm(value: DataModel) {
    this.form = this.fb.group({
      name: [value.name, [Validators.required]],
      dataStorageId: [value.dataStorage, [Validators.required]],
      fields: this.fb.array([
        ...value.fields?.map(field => this.fb.group({
          name: [field.name, [Validators.required]],
          label: [field.label],
          type: [field.type, [Validators.required]],
          required: [field.required]
        }))
      ]),
    })
  }

  @Input() isOpen!: boolean
  @Input() item?: DataModel
  @Output() isOpenChange = new EventEmitter<boolean>()
  @Output() complete = new EventEmitter()

  storages!: DataStorage[]
  storageQueryLoading!: boolean

  form!: FormGroup

  get fields(): FormArray {
    return (this.form?.get('fields') || []) as FormArray
  }

  addField() {
    this.fields.push(
      this.fb.group({
        name: ['', [Validators.required]],
        label: [''],
        type: ['', [Validators.required]],
        required: [false],
      }),
    )
  }

  removeField(index: number) {
    this.fields.removeAt(index)
  }

  types = Object.keys(DataModelFieldType)

  message!: string
  isSaving: boolean = false

  close() {
    this.isOpenChange.emit(false)
  }

  save() {
    if (!this.form.valid) {
      makeFormDirty(this.form)
      this.fields.controls.forEach(f => makeFormDirty(f as FormGroup))
      return
    }

    this.message = ''
    this.isSaving = true

    const id = this.item ? this.item.id :  null

    const request$ = id
      ? this.apollo.mutate<any, MutationUpdateRequestParameters<DataModelDto>>({
        mutation: DATA_MODEL_UPDATE_REQUEST,
        variables: {
          id,
          dto: this.form.getRawValue() as DataModelDto,
        },
      })
      : this.apollo.mutate<any, MutationCreateRequestParameters<DataModelDto>>({
        mutation: DATA_MODEL_CREATE_REQUEST,
        variables: {
          dto: this.form.getRawValue() as DataModelDto,
        },
      })

    request$
      .pipe(
        finalize(() => this.isSaving = false),
      )
      .subscribe(
        () => {
          this.notify.success({
            title: 'data_model',
            content: id ? 'update_success_message' : 'create_success_message',
          })
          this.close()
          this.complete.emit()
        },
        error => {
          this.message = error.message
        },
      )
  }

  storageQueryHandler(search: string) {
    this.storageQueryLoading = true

    this.apollo.query<QueryPageableResponse<DataStorage, 'dataStoragesFind'>, QueryPageableRequest<{
      search: string
    }>>({
      query: gql`
        query getDataStoragesLookup($request: DataStoragePageableRequest!) {
          dataStoragesFind(request: $request) {
            data {
              id
              name
            }
          }
        }
      `,
      variables: {
        request: {
          take: 10,
          skip: 0,
          search,
        },
      },
    })
    .pipe(
      finalize(() => this.storageQueryLoading = false),
    )
    .subscribe(
      result => {
        this.storages = result.data?.dataStoragesFind.data || []
      },
    )
  }
}
