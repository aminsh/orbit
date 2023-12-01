import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DataModel, DataModelSchema } from './schema/data-model'
import { DataStorage, DataStorageSchema } from './schema/data-storage'
import { DataStorageRepository } from './repository/data-storage-repository'
import { DataModelRepository } from './repository/data-model-repository'
import { DataModelService } from './service/data-model.service'
import { DataModelResolver } from './service/data-model.resolver'
import { DataStorageService } from './service/data-storage.service'
import { DataStorageResolver } from './service/data-storage.resolver'
import {
  DATABASE_CONFIGURATION_FACTORY,
  DatabaseConfigurationFactory,
  DatabaseConfigurationsService
} from './service/database-configurations.service'
import { StorageType } from './schema/enums'
import { PostgresConfigurationService } from './service/postgres/postgres-configuration.service'
import { DATABASE_QUERY_FACTORY, DatabaseQueryFactory, DatabaseQueryService } from './service/database-query.service'
import { PostgresQueryService } from './service/postgres/postgres-query.service'
import { SequelizeService } from './service/postgres/sequelize.service'
import { DataModelQueryService } from './service/postgres/data-model-query.service'
import { DataModelQueryResolver } from './service/data-model-query.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataModel.name, schema: DataModelSchema },
      { name: DataStorage.name, schema: DataStorageSchema },
    ]),
  ],
  providers: [
    DataStorageRepository,
    DataStorageService,
    DataStorageResolver,
    DataModelRepository,
    DataModelService,
    DataModelResolver,
    DataModelQueryService,
    DataModelQueryResolver,
    PostgresConfigurationService,
    PostgresQueryService,
    SequelizeService,
    {
      provide: DATABASE_CONFIGURATION_FACTORY,
      useFactory: (
        postgresConfigurationService,
      ): DatabaseConfigurationFactory => {
        return {
          instance(dataStorageType: StorageType): DatabaseConfigurationsService {
            if (dataStorageType === StorageType.Postgres)
              return postgresConfigurationService
          }
        }
      },
      inject: [ PostgresConfigurationService ],
    },
    {
      provide: DATABASE_QUERY_FACTORY,
      useFactory: (postgresQueryService): DatabaseQueryFactory => {
        return {
          instance(dataStorageType: StorageType): DatabaseQueryService {
            if (dataStorageType === StorageType.Postgres)
              return postgresQueryService
          }
        }
      },
      inject: [ PostgresQueryService ],
    },
  ]
})
export class DataModule {
}
