import { DataTypes, Sequelize } from 'sequelize'
import { Client } from 'pg'
import { DataStorage } from '../schema/data-storage'
import { DATABASE_NAME_PRIFIX } from '../data.constant'
import { DataModelRepository } from '../repository/data-model-repository'
import { DataModelFieldType } from '../schema/enums'
import { Injectable } from '@nestjs/common'
import { DataModel } from '../schema/data-model'
import { InsertResponse } from '../data.type'

const dataTypesMapper = {
  [DataModelFieldType.Integer]: DataTypes.INTEGER,
  [DataModelFieldType.Text]: DataTypes.STRING,
  [DataModelFieldType.Float]: DataTypes.FLOAT,
}

@Injectable()
export class PostgresService {
  constructor(
    private dataModelRepository: DataModelRepository,
  ) { }

  private static getDbName(dataStorage: DataStorage): string {
    return `${ DATABASE_NAME_PRIFIX }${ dataStorage._id }`
  }

  private async createInstance(dataStorage: DataStorage): Promise<Sequelize> {
    const instance = new
    Sequelize(`postgres://postgres:P@ssw0rd@localhost:5432/${ PostgresService.getDbName(dataStorage) }`)

    const dataModels = await this.dataModelRepository.find({
      dataStorage,
    })

    for (const model of dataModels) {
      const attributes = {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,

        },
      }

      for (const field of model.fields) {
        attributes[field.name] = {
          type: dataTypesMapper[field.type],
          allowNull: !field.required,
        }
      }

      instance.define(model.name, attributes)
    }

    return instance
  }

  async createDatabase(dataStorage: DataStorage): Promise<void> {
    const client = new Client('postgres://postgres:P@ssw0rd@localhost:5432/postgres')
    await client.connect()
    await client.query(`CREATE DATABASE ${ PostgresService.getDbName(dataStorage) }`)
    client.end()
  }

  async synchronize(dataStorage: DataStorage): Promise<void> {
    const instance = await this.createInstance(dataStorage)

    await instance.sync()
  }

  async insert(dataModel: DataModel, data: any): Promise<InsertResponse> {
    const instance = await this.createInstance(dataModel.dataStorage)

    try {
      const result = await instance.model(dataModel.name).create(data)
      return { id: result.get('id') as number }
    } finally {
      await instance.close()
    }
  }
}
