import {gql} from 'apollo-angular'

export const DATA_MODEL_CREATE_REQUEST = gql`
    mutation DataModelCreateRequest($dto: DataModelDto!) {
      dataModelCreate(dto: $dto) {
        id
      }
    }
`

export const DATA_MODEL_UPDATE_REQUEST = gql`
  mutation DataModelUpdateRequest($id: String!,$dto: DataModelDto!) {
    dataModelUpdate(id: $id,dto: $dto)
  }
`

export const GET_DATA_MODELS = gql`
    query GetDataModels($request: PageableRequest!) {
      dataModelsFind(request: $request) {
        data {
          id
          createdBy {
            name
          }
          name
          dataStorage {
            name
          }
        }
        count
      }
    }
`
