import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataTypes, Sequelize } from 'sequelize'
import { DataStorage } from '../../schema/data-storage'
import { DataModelFieldType } from '../../schema/enums'
import { DATABASE_NAME_PREFIX } from '../../data.constant'
import { DataModelRepository } from '../../repository/data-model-repository'

@Injectable()
export class SequelizeService {
  constructor(
    private configService: ConfigService,
    private dataModelRepository: DataModelRepository,
  ) {}

  getDbName(dataStorage: DataStorage): string {
    return `${ DATABASE_NAME_PREFIX }${ dataStorage._id }`
  }
  
  async instance(dataStorage: DataStorage): Promise<Sequelize> {
    const instance = new
    Sequelize(`${this.configService.get('POSTGRES_URI')}/${ this.getDbName(dataStorage) }`)

    const dataModels = await this.dataModelRepository.find({
      dataStorage,
    })

    const dataTypesMapper = {
      [DataModelFieldType.Integer]: DataTypes.INTEGER,
      [DataModelFieldType.Text]: DataTypes.STRING,
      [DataModelFieldType.Float]: DataTypes.FLOAT,
    }

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

  exceptionHandler(e: any) {
    if (e.name === 'SequelizeDatabaseError')
      throw new BadRequestException(e.message)
  }
}
