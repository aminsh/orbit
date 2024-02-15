import {gql} from 'apollo-angular'
import {DataStorage, StorageType} from '../data.type'

export const DATA_STORAGE_CREATE_REQUEST = gql`
  mutation dataStorageCreateRequest($dto: DataStorageDto!) {
    dataStorageCreate(dto: $dto) {
      id
    }
  }
`

export interface DataStorageCreateVariable {
  dto: {
    name: string
    type: StorageType,
  }
}

export const GET_DATA_STORAGE = gql`
  query getDataStorages($request: PageableRequest!) {
    dataStoragesFind(request: $request) {
      data {
        id
        name
        type
      }
      count
    }
  }
`

export interface DataStorageQueryRequest {
  request: {
    skip: number,
    take: number,
  }
}

export interface DataStorageResponse {
  dataStoragesFind: {
    data: DataStorage[],
    count: number,
  }
}
