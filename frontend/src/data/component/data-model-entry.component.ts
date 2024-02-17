import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {NotifyService} from '../../core/service/notify.service'
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms'
import {DataModelFieldType, StorageType} from '../data.type'
import {makeFormDirty} from '../../core/utils/form.utils'
import {DATA_STORAGE_CREATE_REQUEST, DataStorageCreateVariable} from '../graphql/data-storage.graphql'
import {finalize} from 'rxjs'

@Component({
  templateUrl: './data-model-entry.component.html',
})
export class DataModelEntryComponent {
  constructor(
    private apollo: Apollo,
    private notify: NotifyService,
  ) {
  }

  @Input() isOpen!: boolean
  @Output() isOpenChange = new EventEmitter<boolean>()
  @Output() complete = new EventEmitter()

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    storageId: new FormControl('', [Validators.required]),
    fields: new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        label: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        required: new FormControl(false, [])
      })
    ])
  })

  types = Object.keys(DataModelFieldType)

  message!: string
  isSaving: boolean = false

  close() {
    this.isOpenChange.emit(false)
  }

  save() {
    if (!this.form.valid)
      return makeFormDirty(this.form)

    this.message = ''
    this.isSaving = true

    this.apollo.mutate<any, DataStorageCreateVariable>({
      mutation: DATA_STORAGE_CREATE_REQUEST,
      variables: {
        dto: this.form.getRawValue() as DataStorageCreateVariable['dto'],
      },
    })
      .pipe(
        finalize(() => this.isSaving = false),
      )
      .subscribe(
        () => {
          this.notify.success({
            title: 'data_storage',
            content: 'create_message_successfully',
          })
          this.close()
          this.complete.emit()
        },
        error => {
          this.message = error.message
        },
      )
  }
}
