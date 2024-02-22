import { Component, ViewContainerRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { DataModel } from '../data.type'
import { finalize } from 'rxjs'
import { Identity, Nullable, QueryPageableRequest, QueryPageableResponse } from '../../core/type'
import { DATA_MODEL_REMOVE_REQUEST, GET_DATA_MODELS } from '../graphql/data-model.graphql'
import { ModalFactoryService } from '../../core/service/modal-factory/modal-factory.service'
import { DataModelEntryComponent } from './data-model-entry.component'
import { OrbNotifyService } from '../../core/service/notify.service'
import { OrbTranslateService } from '../../core/service/translate'
import { DataModelFormEntryComponent } from './data-model-form-entry.component'

@Component({
  templateUrl: './data-models.component.html',
})
export class DataModelsComponent {
  constructor(
    private modalService: ModalFactoryService,
    private viewContainerRef: ViewContainerRef,
    private apollo: Apollo,
    private notify: OrbNotifyService,
    private translate: OrbTranslateService,
  ) {
  }

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
      nzTitle: this.translate.get(id ? 'edit' : 'new', 'data_model'),
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

  remove(id: string) {
    this.modalService.confirm({
      title: this.translate.get('removing', 'data_model'),
      content: this.translate.get('are_you_sure'),
      handleOk: () => {
        this.apollo.query<void, Identity>({
          query: DATA_MODEL_REMOVE_REQUEST,
          variables: {
            id,
          }
        }).subscribe(() => {
          this.notify.success({
            title: this.translate.get('data_model'),
            content: this.translate.get('remove_success_message'),
          })
          this.refresh()
        })
      },
    })
  }

  showFormEntry(id: string) {
    this.modalService.create(
      DataModelFormEntryComponent,
      {modelId: id,},
      {
        nzTitle: this.translate.get('data_mode', 'entry', 'form'),
        nzViewContainerRef: this.viewContainerRef,
      })
  }
}

