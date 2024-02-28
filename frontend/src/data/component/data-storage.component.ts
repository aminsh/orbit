import { Component, ViewContainerRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { DataStorage, StorageStatus } from '../data.type'
import {
  DATA_STORAGE_SYNCHRONIZE_REQUEST,
  DataStorageQueryRequest,
  DataStorageResponse,
  GET_DATA_STORAGE,
} from '../graphql/data-storage.graphql'
import { finalize } from 'rxjs'
import { ModalFactoryService } from '../../core/service/modal-factory/modal-factory.service'
import { DataStorageEntryComponent } from './data-storage-entry.component'
import { Identity } from '../../core/type'
import { OrbNotifyService } from '../../core/service/notify.service'
import { OrbTranslateService } from '../../core/service/translate'
import { NzModalService } from 'ng-zorro-antd/modal'

@Component({
  templateUrl: './data-storage.component.html',
})
export class DataStorageComponent {
  constructor(
    private apollo: Apollo,
    private modalFactory: ModalFactoryService,
    private viewContainerRef: ViewContainerRef,
    private notify: OrbNotifyService,
    private translate: OrbTranslateService,
    private modalService: NzModalService,
  ) {
  }

  protected readonly StorageStatus = StorageStatus

  initializing: boolean = false
  synchronizing: boolean = false
  statusColor = {
    [StorageStatus.Pending]: '',
    [StorageStatus.Ready]: '#87d068',
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

  create() {
    const modal: any = this.modalService.create({
      nzTitle: this.translate.get('new', 'data_storage'),
      nzContent: DataStorageEntryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: async instance => {
        await instance.save()
        this.notify.success({
          title: this.translate.get('data_storage'),
          content: this.translate.get('done_successfully'),
        })
        this.refresh()
      }
    })

    /*modal.afterClose.subscribe((result: string) => {
      console.log(result)
      this.refresh()

      this.notify.success({
        title: this.translate.get('data_storage'),
        content: this.translate.get('done_successfully'),
      })
    })*/
  }

  refresh() {
    this.fetch({pageSize: this.tableOptions.pageSize, pageIndex: 1} as NzTableQueryParams)
  }

  initialize(id: string) {
    this.modalFactory.confirm({
      title: this.translate.get('initializing', 'data_storage'),
      content: this.translate.get('are_you_sure'),
      handleOk: () => {
        this.initializing = true

        this.apollo.mutate<void, Identity>({
          mutation: DATA_STORAGE_SYNCHRONIZE_REQUEST,
          variables: {
            id,
          },
        })
          .pipe(finalize(() => this.synchronizing = false))
          .subscribe(() => {
            this.notify.success({
              title: this.translate.get('data_storage'),
              content: this.translate.get('data_storage_initialized_success_message'),
            })
            this.refresh()
          })
      },
    })
  }

  synchronize(id: string) {
    this.modalFactory.confirm({
      title: this.translate.get('synchronizing', 'data_storage'),
      content: this.translate.get('are_your_sure'),
      handleOk: () => {
        this.synchronizing = true

        this.apollo.mutate<void, Identity>({
          mutation: DATA_STORAGE_SYNCHRONIZE_REQUEST,
          variables: {
            id,
          },
        })
          .pipe(finalize(() => this.synchronizing = false))
          .subscribe(() => {
            this.notify.success({
              title: this.translate.get('data_storage'),
              content: this.translate.get('data_storage_synchronized_success_message'),
            })
          })
      },
    })
  }
}
