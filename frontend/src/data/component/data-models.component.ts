import { Component, ViewContainerRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { DataModel } from '../data.type'
import { finalize } from 'rxjs'
import { Identity, Nullable, QueryPageableRequest, QueryPageableResponse } from '../../core/type'
import { DATA_MODEL_REMOVE_REQUEST, GET_DATA_MODELS } from '../graphql/data-model.graphql'
import { DataModelEntryComponent } from './data-model-entry.component'
import { OrbNotifyService } from '../../core/service/notify.service'
import { OrbTranslateService } from '../../core/service/translate'
import { OrbModalService } from '../../core/service/orb-modal.service'

@Component({
  templateUrl: './data-models.component.html',
})
export class DataModelsComponent {
  constructor(
    private modalService: OrbModalService,
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
    this.modalService.create({
      nzTitle: this.translate.get(id ? 'edit' : 'new', 'data_model'),
      nzViewContainerRef: this.viewContainerRef,
      nzContent: DataModelEntryComponent,
      nzData: params,
      nzOnOk: async instance => {
        await instance.save()
        this.notify.success({
          title: 'data_model',
          content: id ? 'update_success_message' : 'create_success_message',
        })
        this.refresh()
      },
    })
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
      nzTitle: this.translate.get('removing', 'data_model'),
      nzViewContainerRef: this.viewContainerRef,
      nzContent: this.translate.get('are_you_sure'),
      nzOnOk: () => {
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

  showFormEntry(id: string, name: string) {

  }
}

