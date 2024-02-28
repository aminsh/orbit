import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ActivatedRoute } from '@angular/router'
import { DataModalService } from '../../data/service/data-modal.service'
import { DataModel } from '../../data/data.type'
import { Identity, QueryPageableResponse, TableOptions } from '../../core/type'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { finalize, Subscription } from 'rxjs'
import { LIST_QUERY } from '../graphql/list.graphql'
import { OrbModalService } from '../../core/service/orb-modal.service'
import { ListEntryComponent } from './list-entry.component'
import { OrbTranslateService } from '../../core/service/translate'
import { OrbNotifyService } from '../../core/service/notify.service'

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private dataModelService: DataModalService,
    private modalService: OrbModalService,
    private translate: OrbTranslateService,
    private viewContainerRef: ViewContainerRef,
    private notify: OrbNotifyService,
  ) {
  }

  dataModel!: DataModel
  tableOptions: TableOptions = {
    total: 0,
    data: [],
    pageIndex: 1,
    pageSize: 10,
    loading: false,
  }

  private routeParamsSubscription!: Subscription

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => this.init(params['modelId']))
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe()
  }

  entry(id?: number) {
    this.modalService.create({
      nzTitle: this.translate.get(id ? 'edit' : 'new', this.dataModel.name),
      nzContent: ListEntryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzClosable: false,
      nzMaskClosable: false,
      nzData: {modelId: this.dataModel.id, id},
      nzOnOk: async instance => {
        await instance.save()
        this.notify.success({
          title: this.translate.get(this.dataModel.name),
          content: this.translate.get('done_successfully'),
        })
        this.refresh()
      },
    })
  }

  fetch(params: NzTableQueryParams) {
    this.tableOptions.loading = true

    this.apollo.query<QueryPageableResponse<any[], 'dataModelQueryFind'>, { query: any } & Identity>({
      query: LIST_QUERY,
      variables: {
        id: this.dataModel.id,
        query: {
          offset: (params.pageIndex - 1) * params.pageSize,
          limit: params.pageSize,
          order: [
            ['id', 'DESC']
          ]
        },
      },
    })
      .pipe(
        finalize(() => this.tableOptions.loading = false),
      )
      .subscribe(result => {
        const {data, count} = result.data.dataModelQueryFind
        this.tableOptions.data = data
        this.tableOptions.total = count
      })
  }

  refresh() {
    this.fetch({pageSize: this.tableOptions.pageSize, pageIndex: 1} as NzTableQueryParams)
  }

  private init(modelId: string) {
    this.dataModelService.findById(modelId)
      .subscribe(result => {
        this.dataModel = result
        this.refresh()
      })
  }
}
