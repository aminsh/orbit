import {User} from '../user/user.type'

export interface DataStorage {
  createdBy: User,
  name: string
  type: StorageType
  status: StorageStatus
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
