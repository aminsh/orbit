import {User} from '../user/user.type'

export interface DataStorage {
  id: string,
  createdBy: User,
  name: string
  type: StorageType
  status: StorageStatus
}

export interface DataModel {
  id: string,
  createdBy: User,
  name: string
  dataStorage: DataStorage
  fields: DataModelField[]
}

export interface DataModelField {
  name: string
  label: string
  type: DataModelFieldType
  required: boolean
}

export interface DataModelDto {
  name: string
  storageId: string
  fields: {
    name: string
    label: string
    type: DataModelFieldType
    required: boolean
  }[]
}

export enum StorageType {
  Postgres = 'Postgres'
}

export enum StorageStatus {
  Pending = 'Pending',
  Ready = 'Ready'
}

export enum DataModelFieldType {
  Text = 'Text',
  Integer = 'Text',
  Float = 'Float',
  Boolean = 'Boolean',
}
