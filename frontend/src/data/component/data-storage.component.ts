import {Component} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {DataStorage} from '../data.type'
import {DataStorageQueryRequest, DataStorageResponse, GET_DATA_STORAGE} from '../graphql/data-storage.graphql'
import {finalize} from 'rxjs'

@Component({
  templateUrl: './data-storage.component.html',
})
export class DataStorageComponent {
  constructor(
    private apollo: Apollo,
  ) {
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
    this.tableOptions.loading = true

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
