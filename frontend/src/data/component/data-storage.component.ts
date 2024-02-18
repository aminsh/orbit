import {Component} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {DataStorage} from '../data.type'
import {DataStorageQueryRequest, DataStorageResponse, GET_DATA_STORAGE} from '../graphql/data-storage.graphql'
import {finalize} from 'rxjs'
import {ModalFactoryService} from '../../core/service/modal-factory/modal-factory.service'
import {DataStorageEntryComponent} from './data-storage-entry.component'

@Component({
  templateUrl: './data-storage.component.html',
})
export class DataStorageComponent {
  constructor(
    private apollo: Apollo,
    private modalFactory: ModalFactoryService,
  ) {
  }

  create() {
    this.modalFactory.create(DataStorageEntryComponent).afterClose.subscribe(() => this.refresh())
  }

  isEntryOpen: boolean = false
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
}
