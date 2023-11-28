import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DataModel, DataModelSchema } from './schema/data-model'
import { DataStorage, DataStorageSchema } from './schema/data-storage'
import { DataStorageRepository } from './repository/data-storage-repository'
import { DataModelRepository } from './repository/data-model-repository'
import { DataModelService } from './service/data-model.service'
import { DataModelResolver } from './service/data-model.resolver'
import { DataStorageService } from './service/data-storage.service'
import { DatdStorageResolver } from './service/data-storage.resolver'
import { PostgresService } from './service/postgres.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataModel.name, schema: DataModelSchema },
      { name: DataStorage.name, schema: DataStorageSchema },
    ]),
  ],
  providers: [
    PostgresService,
    DataStorageRepository,
    DataStorageService,
    DatdStorageResolver,
    DataModelRepository,
    DataModelService,
    DataModelResolver,
  ]
})
export class DataModule {
}
