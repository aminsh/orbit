import { gql } from 'apollo-angular'

export const LIST_INSERT_REQUEST = gql`
  mutation DataModelCreateRequest($id: String!,$data: JSON!) {
    dataModelQueryInsert(id: $id, data: $data) {
      id
    }
  }
`

export const LIST_UPDATE_REQUEST = gql`
  mutation DataModelUpdateRequest($id: String!, $where: JSON!, $data: JSON!) {
    dataModelQueryUpdate(id: $id, where: $where, data: $data)
  }
`

export const LIST_QUERY = gql`
  query GetListItems($id: String!, $query: JSON!) {
    dataModelQueryFind(id: $id, query: $query) {
      data
      count
    }
  }
`

export const LIST_QUERY_FIND_ONE = gql`
  query GetListQueryFindOne($id: String!, $query: JSON!) {
    dataModelQueryFindOne(id: $id, query: $query)
  }
`
