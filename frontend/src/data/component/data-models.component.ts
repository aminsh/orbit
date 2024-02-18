import {Component, inject, ViewContainerRef} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {DataModel} from '../data.type'
import {finalize} from 'rxjs'
import {QueryPageableRequest, QueryPageableResponse} from '../../core/type'
import {GET_DATA_MODELS} from '../graphql/data-model.graphql'
import {NZ_MODAL_DATA, NzModalRef, NzModalService} from 'ng-zorro-antd/modal'

@Component({
  templateUrl: './data-models.component.html',
})
export class DataModelsComponent {
  constructor(
    private nzModalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private apollo: Apollo,
  ) {
  }

  isEntryOpen: boolean = false
  selectedItem?: DataModel

  tableOptions = {
    total: 0,
    data: [] as DataModel[],
    pageSize: 10,
    pageIndex: 1,
    loading: false,
  }

  create() {
    /*this.selectedItem = undefined
    this.isEntryOpen = true*/

    const modal = this.nzModalService.create({
      nzTitle: 'Test',
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        id: 'fs',
        name: 'Amin',
      },
      nzContent: ModalCustomComponent,
      nzOnOk: data => {
        instance.ok()
      }
    })

    const instance = modal.getContentComponent()
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result))
  }

  edit(item: DataModel) {
    this.selectedItem = item
    this.isEntryOpen = true
  }

  fetch(params: NzTableQueryParams) {
    this.tableOptions.loading = true

    this.apollo.query<QueryPageableResponse<DataModel, 'dataModelsFind'>, QueryPageableRequest>({
      query: GET_DATA_MODELS,
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
          this.tableOptions.total = result.data?.dataModelsFind.count
          this.tableOptions.data = result.data?.dataModelsFind.data
        },
      )
  }

  refresh() {
    this.fetch({pageSize: this.tableOptions.pageSize, pageIndex: 1} as NzTableQueryParams)
  }
}

@Component({
  template: `
    <span>{{nzModalData| json}}</span>
    <a (click)="ok()">OK</a>
  `
})
export class ModalCustomComponent {
  readonly nzModalData = inject(NZ_MODAL_DATA)
  readonly #modal = inject(NzModalRef)

  ok() {
    this.#modal.destroy({result: 'SUCCESS'})
  }
}
