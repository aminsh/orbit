import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiConfiguration, ApiConfigurationSchema } from './schema/api-configuration'
import { ApiConfigurationService } from './service/api-configuration.service'
import { ApiConfigurationRepository } from './repository/api-configuration.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ApiConfiguration.name, schema: ApiConfigurationSchema},
    ]),
  ],
  providers: [
    ApiConfigurationRepository,
    ApiConfigurationService,
  ],
})
export class ApiModule {
}