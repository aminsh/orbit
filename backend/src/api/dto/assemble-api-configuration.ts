import { ApiConfiguration } from '../schema/api-configuration'
import { ApiConfigurationView } from './api-configuration.view'
import { userAssembler } from '../../user/dto/user-assembler'
import { assembleDataModel } from '../../data/dto/assemble-date-model'
import { assembleApiConfigurationEndpoint } from './assemble-api-configuration-endpoint'

export const assembleApiConfiguration = (entity: ApiConfiguration): ApiConfigurationView => ({
  id: entity._id,
  createdBy: userAssembler(entity.createdBy),
  dataModal: assembleDataModel(entity.dataModal),
  prefix: entity.prefix,
  endpoints: entity.endpoints?.map(assembleApiConfigurationEndpoint),
})