import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Identity } from '../../core/type'
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal'
import { DataModel } from '../../data/data.type'
import { finalize } from 'rxjs'
import { LIST_INSERT_REQUEST, LIST_QUERY_FIND_ONE, LIST_UPDATE_REQUEST } from '../graphql/list.graphql'
import { FormContainerComponent } from './dynamic-form/form-container.component'
import { makeFormDirty } from '../../core/utils/form.utils'
import { DataModalService } from '../../data/service/data-modal.service'

@Component({
  template: `
    <form-container
      *ngIf="dataModel"
      [dataModel]="dataModel"
    />
  `,
})
export class ListEntryComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private dataModelService: DataModalService,
  ) {
  }

  data: { modelId: string, id?: number } = inject(NZ_MODAL_DATA)
  isLoading: boolean = false
  dataModel!: DataModel

  @ViewChild(FormContainerComponent) formContainer!: FormContainerComponent

  ngOnInit(): void {
    const {modelId} = this.data

    this.dataModelService.findById(modelId)
      .subscribe(result => {
        this.dataModel = result
        this.fetch()
      })
  }

  save(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.formContainer.form.valid) {
        makeFormDirty(this.formContainer.form)
        return reject()
      }

      const {id} = this.data

      this.isLoading = true
      const data = this.formContainer.form.getRawValue()

      const request$ = id
        ? this.apollo.mutate<void, Identity & { data: any, where: any }>({
          mutation: LIST_UPDATE_REQUEST,
          variables: {
            id: this.data.modelId,
            data,
            where: {id},
          },
        })
        : this.apollo.mutate<void, Identity & { data: any }>({
          mutation: LIST_INSERT_REQUEST,
          variables: {
            id: this.data.modelId,
            data,
          },
        })

      request$
        .pipe(
          finalize(() => this.isLoading = false),
        )
        .subscribe(
          () => resolve(),
          error => reject(),
        )
    })
  }

  private fetch() {
    const {modelId, id} = this.data

    if (!id)
      return

    this.isLoading = true

    this.apollo.query<{ dataModelQueryFindOne: any }, Identity & { query: any }>({
      query: LIST_QUERY_FIND_ONE,
      variables: {
        id: modelId,
        query: {
          where: {
            id,
          },
        },
      },
    })
      .pipe(
        finalize(() => this.isLoading = false),
      )
      .subscribe(result => {
        this.formContainer.setValue(result.data.dataModelQueryFindOne)
      })
  }
}
