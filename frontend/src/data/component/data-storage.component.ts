import { Component, ViewContainerRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { DataStorage, StorageStatus } from '../data.type'
import {
  DATA_STORAGE_INITIALIZE_REQUEST,
  DataStorageQueryRequest,
  DataStorageResponse,
  GET_DATA_STORAGE,
} from '../graphql/data-storage.graphql'
import { finalize } from 'rxjs'
import { ModalFactoryService } from '../../core/service/modal-factory/modal-factory.service'
import { DataStorageEntryComponent } from './data-storage-entry.component'
import { Identity } from '../../core/type'
import { NotifyService } from '../../core/service/notify.service'

@Component({
  templateUrl: './data-storage.component.html',
})
export class DataStorageComponent {
  constructor(
    private apollo: Apollo,
    private modalFactory: ModalFactoryService,
    private viewContainerRef: ViewContainerRef,
    private notify: NotifyService,
  ) {
  }

  initializing: boolean = false
  statusColor = {
    [StorageStatus.Pending]: '',
    [StorageStatus.Ready]: '#87d068',
  }

  create() {
    this.modalFactory.create(DataStorageEntryComponent, null, {
      nzTitle: ['new', 'data_storage'],
      nzViewContainerRef: this.viewContainerRef,
    })
      .afterClose
      .subscribe(() => this.refresh())
  }

  tableOptions = {
    total: 0,
    data: [] as DataStorage[],
    pageSize: 10,
    pageIndex: 1,
    loading: false,
  }

  fetch(params: NzTableQueryParams) {
    this.tableOptions.loading = false

    this.apollo.query<DataStorageResponse, DataStorageQueryRequest>({
      query: GET_DATA_STORAGE,
      variables: {
        request: {
          take: params.pageSize,
          skip: (params.pageIndex - 1) * params.pageSize,
        },
      },
    })
      .pipe(finalize(() => this.tableOptions.loading = false))
      .subscribe(
        result => {
          this.tableOptions.total = result.data?.dataStoragesFind.count
          this.tableOptions.data = result.data?.dataStoragesFind.data
        },
      )
  }

  refresh() {
    this.fetch({pageSize: this.tableOptions.pageSize, pageIndex: 1} as NzTableQueryParams)
  }

  initialize(id: string) {
    this.initializing = true

    this.modalFactory.confirm({
      title: 'Initializing data storage',
      content: 'Are you sure ?',
      handleOk: () => {
        this.apollo.mutate<void, Identity>({
          mutation: DATA_STORAGE_INITIALIZE_REQUEST,
          variables: {
            id,
          },
        })
          .pipe(finalize(() => this.initializing = false))
          .subscribe(() => {
            this.notify.success({
              title: 'data_storage',
              content: 'data_storage_initialized_success_message',
            })
            this.refresh()
          })
      },
    })
  }

  protected readonly StorageStatus = StorageStatus
}
