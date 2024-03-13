import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiConfiguration, ApiConfigurationSchema } from './schema/api-configuration'
import { ApiConfigurationService } from './service/api-configuration.service'
import { ApiConfigurationRepository } from './repository/api-configuration.repository'
import { ApiConfigurationResolver } from './service/api-configuration.resolver'
import { DataModule } from '../data/data.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ApiConfiguration.name, schema: ApiConfigurationSchema},
    ]),
    DataModule,
  ],
  providers: [
    ApiConfigurationRepository,
    ApiConfigurationService,
    ApiConfigurationResolver,
  ],
})
export class ApiModule {
}