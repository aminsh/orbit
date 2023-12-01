import { DatabaseConfigurationsService } from '../database-configurations.service'
import { Injectable } from '@nestjs/common'
import { DataStorage } from '../../schema/data-storage'
import { Client } from 'pg'
import { ConfigService } from '@nestjs/config'
import { SequelizeService } from './sequelize.service'

@Injectable()
export class PostgresConfigurationService implements DatabaseConfigurationsService {
  constructor(
    private configService: ConfigService,
    private sequelizeService: SequelizeService,
  ) {}

  async init(dataStorage: DataStorage): Promise<void> {
    const client = new Client(`${ this.configService.get('POSTGRES_URI') }/postgres`)
    await client.connect()
    await client.query(`CREATE DATABASE ${ this.sequelizeService.getDbName(dataStorage) }`)
    await client.end()
  }

  async sync(dataStorage: DataStorage): Promise<void> {
    const instance = await this.sequelizeService.instance(dataStorage)
    await instance.sync()
  }
}
