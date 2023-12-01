import { DataModel } from '../schema/data-model'
import { InsertResponse, QueryFindAndCountResponse } from '../data.type'
import { StorageType } from '../schema/enums'

export interface DatabaseQueryService {
  insert(dataModel: DataModel, data: any): Promise<InsertResponse>

  update(dataModel: DataModel, where: any, data: any): Promise<void>

  delete(dataModel: DataModel, where: any): Promise<void>

  insertMany(dataModel: DataModel, data: any[]): Promise<InsertResponse[]>

  find(dataModel: DataModel, query:any): Promise<QueryFindAndCountResponse>

  findOne(dataModel: DataModel, query: any): Promise<any>
}

export interface DatabaseQueryFactory {
  instance(dataStorageType: StorageType): DatabaseQueryService
}

export const DATABASE_QUERY_FACTORY = 'DATABASE_QUERY_FACTORY'
