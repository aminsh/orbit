import { Injectable } from '@nestjs/common'
import { DatabaseQueryService } from '../database-query.service'
import { DataModel } from '../../schema/data-model'
import { InsertResponse, QueryFindAndCountResponse } from '../../data.type'
import { SequelizeService } from './sequelize.service'
import { Op } from 'sequelize'
import { isSimpleType } from '../../../shared/utils'

@Injectable()
export class PostgresQueryService implements DatabaseQueryService {
  constructor(
    private sequelizeService: SequelizeService,
  ) {}

  async find(dataModel: DataModel, query: any): Promise<QueryFindAndCountResponse> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    const resolvedQuery = {
      ...query,
      ...(
        typeof query?.where === 'object'
          ? { where: resolveWhere(query.where) }
          : {}
      )
    }

    try {
      const { rows: data, count } = await instance.model(dataModel.name).findAndCountAll(resolvedQuery)
      return {
        data,
        count,
      }
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }

  async findOne(dataModel: DataModel, query: any): Promise<any> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    const resolvedQuery = {
      ...query,
      ...(
        typeof query?.where === 'object'
          ? { where: resolveWhere(query.where) }
          : {}
      )
    }

    try {
      return await instance.model(dataModel.name).findOne(resolvedQuery)
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }

  async insert(dataModel: DataModel, data: any): Promise<InsertResponse> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    try {
      const result = await instance.model(dataModel.name).create(data)
      return { id: result.get('id') as number }
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }

  async insertMany(dataModel: DataModel, data: any[]): Promise<InsertResponse[]> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    try {
      const result = await instance.model(dataModel.name).bulkCreate(data)
      return result.map(it => ({ id: it.get('id') as number }))
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }

  async update(dataModel: DataModel, where: any, data: any): Promise<void> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    try {
      await instance.model(dataModel.name).update(data, { where: resolveWhere(where) })
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }

  async delete(dataModel: DataModel, where: any): Promise<void> {
    const instance = await this.sequelizeService.instance(dataModel.dataStorage)

    try {
      await instance.model(dataModel.name).destroy({ where: resolveWhere(where) })
    } catch (e) {
      this.sequelizeService.exceptionHandler(e)
    } finally {
      await instance.close()
    }
  }
}

const resolveWhere = (object: any) => {
  const opMapper = Object.entries(Op).map(([ key, value ]) => ({ key, value }))
  Object.entries(object).forEach(([ key, value ]) => {
    const keyMapper = opMapper.find(om => om.key === key)
    let newKey = key

    if (keyMapper) {
      delete object[key]
      newKey = keyMapper.value
    }

    if (isSimpleType(value, { maybeIsArray: true }))
      object[newKey] = value
    else {
      object[newKey] = Array.isArray(value)
        ? value.map(it => resolveWhere(it))
        : resolveWhere(value)
    }
  })
  return object
}
