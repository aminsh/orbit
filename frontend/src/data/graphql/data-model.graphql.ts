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

export const DATA_MODEL_REMOVE_REQUEST = gql`
    mutation DataModelRemoveRequest($id: String!) {
      dataModelRemove(id: $id)
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

export const GET_DATA_MODEL_BY_ID = gql`
  query GetDataModelById($id: String!) {
    dataModelFindById(id: $id) {
      id
      name
      dataStorage {
        id
        name
      }
      fields {
        name
        label
        type
        required
      }
    }
  }
`
