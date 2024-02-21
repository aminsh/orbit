import { Component, inject, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { OrbNotifyService } from '../../core/service/notify.service'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataModel, DataModelDto, DataModelField, DataModelFieldType, DataStorage } from '../data.type'
import { makeFormDirty } from '../../core/utils/form.utils'
import { finalize } from 'rxjs'
import {
  Identity,
  MutationCreateRequestParameters,
  MutationUpdateRequestParameters,
  QueryPageableRequest,
  QueryPageableResponse,
} from '../../core/type'
import {
  DATA_MODEL_CREATE_REQUEST,
  DATA_MODEL_UPDATE_REQUEST,
  GET_DATA_MODEL_BY_ID,
} from '../graphql/data-model.graphql'
import { ModalComponentType } from '../../core/service/modal-factory/modal-factory.type'
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal'

@Component({
  selector: 'data-model-entry',
  templateUrl: './data-model-entry.component.html',
})
export class DataModelEntryComponent implements OnInit, ModalComponentType {
  constructor(
    private apollo: Apollo,
    private notify: OrbNotifyService,
    private fb: FormBuilder,
  ) {
  }

  data: Identity = inject(NZ_MODAL_DATA)
  storages!: DataStorage[]
  storageQueryLoading!: boolean
  form!: FormGroup
  isLoading: boolean = false

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      dataStorageId: ['', [Validators.required]],
      fields: this.fb.array([]),
    })

    if (!this.data)
      return

    this.isLoading = true

    this.apollo.query<{ dataModelFindById: DataModel }, Identity>({
      query: GET_DATA_MODEL_BY_ID,
      variables: {
        id: this.data.id,
      },
    })
      .pipe(
        finalize(() => this.isLoading = false),
      )
      .subscribe(result => {
        const {name, dataStorage, fields} = result.data.dataModelFindById
        this.form.setValue({
          name,
          dataStorageId: dataStorage.id,
          fields: []
        })

        this.storages = [dataStorage]
        fields.forEach(field => this.fields.push(this.createFields(field)))
      })
  }

  private createFields(value: Partial<DataModelField>) {
    const form = this.fb.group({
      name: ['', [Validators.required]],
      label: [''],
      type: ['', [Validators.required]],
      required: [false]
    })

    form.setValue({
      name: value.name || null,
      label: value.label || null,
      type: value.type || null,
      required: value.required || false,
    })

    return form
  }

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

  get canOK(): boolean {
    if (this.form.valid)
      return true

    makeFormDirty(this.form)
    this.fields.controls.forEach(f => makeFormDirty(f as FormGroup))
    return false
  }

  submit() {
    if (!this.canOK)
      return

    this.message = ''
    this.isSaving = true

    const id = this.data ? this.data.id : null

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
