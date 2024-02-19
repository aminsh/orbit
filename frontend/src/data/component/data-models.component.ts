import {Component, inject, ViewContainerRef} from '@angular/core'
import {Apollo} from 'apollo-angular'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {DataModel} from '../data.type'
import {finalize} from 'rxjs'
import {Identity, Nullable, QueryPageableRequest, QueryPageableResponse} from '../../core/type'
import {GET_DATA_MODELS} from '../graphql/data-model.graphql'
import {NZ_MODAL_DATA, NzModalRef, NzModalService} from 'ng-zorro-antd/modal'
import {ModalFactoryService} from '../../core/service/modal-factory/modal-factory.service'
import {DataModelEntryComponent} from './data-model-entry.component'

@Component({
  templateUrl: './data-models.component.html',
})
export class DataModelsComponent {
  constructor(
    private modalService: ModalFactoryService,
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

  showEntry(id?: string) {
    const params: Nullable<Identity> = id ? {id} : null
    this.modalService.create(DataModelEntryComponent, params, {
      nzTitle: [id ? 'edit' : 'new', 'data_model'],
      nzViewContainerRef: this.viewContainerRef,
    })
      .afterClose
      .subscribe(() => this.refresh())
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
    <span>{{ nzModalData| json }}</span>
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
