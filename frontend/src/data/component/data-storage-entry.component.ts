import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {makeFormDirty} from '../../core/utils/form.utils'
import {DATA_STORAGE_CREATE_REQUEST, DataStorageCreateVariable} from '../graphql/data-storage.graphql'
import {StorageType} from '../data.type'
import {finalize} from 'rxjs'
import {ModalComponentType} from '../../core/service/modal-factory/modal-factory.type'

@Component({
  selector: 'data-storage-entry',
  templateUrl: './data-storage-entry.component.html',
})
export class DataStorageEntryComponent implements ModalComponentType {
  constructor(
    private apollo: Apollo,
    //private notify: NotifyService,
  ) {
  }

  submit(): void {
    this.save()
  }

  @Input() isOpen!: boolean
  @Output() isOpenChange = new EventEmitter<boolean>()
  @Output() complete = new EventEmitter()

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  })

  types = Object.keys(StorageType)

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
          /*this.notify.success({
            title: 'data_storage',
            content: 'create_message_successfully',
          })*/
          this.close()
          this.complete.emit()
        },
        error => {
          this.message = error.message
        },
      )
  }
}
