import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map, Observable } from 'rxjs'
import { DataModel } from '../data.type'
import { Identity, QueryPageableRequest, QueryPageableResponse } from '../../core/type'
import { GET_DATA_MODEL_BY_ID, GET_DATA_MODELS } from '../graphql/data-model.graphql'

@Injectable()
export class DataModalService {
  constructor(
    private apollo: Apollo,
  ) {
  }

  findById(id: string): Observable<DataModel> {
    return this.apollo.query<{ dataModelFindById: DataModel }, Identity>({
      query: GET_DATA_MODEL_BY_ID,
      variables: {
        id,
      },
    })
      .pipe(
        map(result => result.data.dataModelFindById),
      )
  }

  find(request: QueryPageableRequest['request']): Observable<{ data: DataModel[], count: number }> {
    return this.apollo.query<QueryPageableResponse<DataModel, 'dataModelsFind'>, QueryPageableRequest>({
      query: GET_DATA_MODELS,
      variables: {
        request,
      },
    })
      .pipe(
        map(result => result.data.dataModelsFind),
      )
  }
}
