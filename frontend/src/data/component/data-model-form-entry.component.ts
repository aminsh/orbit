import { Component, inject, OnInit } from '@angular/core'
import { ModalComponentType } from '../../core/service/modal-factory/modal-factory.type'
import { Apollo } from 'apollo-angular'
import { Identity } from '../../core/type'
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal'
import { DataModel } from '../data.type'
import { GET_DATA_MODEL_BY_ID } from '../graphql/data-model.graphql'
import { finalize } from 'rxjs'

@Component({
  template: `
    <form-container
      *ngIf="dataModel"
      [dataModel]="dataModel"
    />
  `,
})
export class DataModelFormEntryComponent implements OnInit, ModalComponentType {
  constructor(
    private apollo: Apollo,
  ) {
  }

  data: {modelId: string} = inject(NZ_MODAL_DATA)
  isLoading: boolean = false
  dataModel!: DataModel

  get canOK(): boolean {
    return false
  }

  ngOnInit(): void {
    this.apollo.query<{ dataModelFindById: DataModel }, Identity>({
      query: GET_DATA_MODEL_BY_ID,
      variables: {
        id: this.data.modelId,
      },
    })
      .pipe(
        finalize(() => this.isLoading = false),
      )
      .subscribe(result => {
        this.dataModel = result.data.dataModelFindById
      })
  }

  submit(): void {

  }
}
