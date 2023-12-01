import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { DATABASE_QUERY_FACTORY, DatabaseQueryFactory, DatabaseQueryService } from '../database-query.service'
import { DataModelRepository } from '../../repository/data-model-repository'
import { InsertResponse, QueryFindAndCountResponse } from '../../data.type'
import { DataModel } from '../../schema/data-model'

@Injectable()
export class DataModelQueryService {
  constructor(
    @Inject(DATABASE_QUERY_FACTORY) private databaseQueryFactory: DatabaseQueryFactory,
    private dataModelRepository: DataModelRepository,
  ) {}

  async insert(id: string, data: any): Promise<InsertResponse> {
    const { entity, service } = await this.fetch(id)
    return service.insert(entity, data)
  }

  async insertMany(id: string, data: any[]): Promise<InsertResponse[]> {
    const { entity, service } = await this.fetch(id)
    return service.insertMany(entity, data)
  }

  async update(id: string, where: any, data: any): Promise<void> {
    const { entity, service } = await this.fetch(id)
    return service.update(entity, where, data)
  }

  async delete(id: string, where: any): Promise<void> {
    const { entity, service } = await this.fetch(id)
    return service.delete(entity, where)
  }

  async find(id: string, query: any): Promise<QueryFindAndCountResponse> {
    const { entity, service } = await this.fetch(id)
    return service.find(entity, query)
  }

  async findOne(id: string, query: any): Promise<any> {
    const { entity, service } = await this.fetch(id)
    return service.findOne(entity, query)
  }

  private async fetch(id: string): Promise<{ service: DatabaseQueryService, entity: DataModel }> {
    const entity = await this.dataModelRepository.findOne({
      _id: id
    }, {}, { populate: 'dataStorage' })

    if (!entity)
      throw new NotFoundException()

    return {
      service: this.databaseQueryFactory.instance(entity.dataStorage.type),
      entity,
    }
  }
}
