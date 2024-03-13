import { ApiConfigurationEndpoint } from '../schema/api-configuration-endpoint'
import { ApiConfigurationEndpointsView } from './api-configuration-endpoints.view'

export const assembleApiConfigurationEndpoint = (item: ApiConfigurationEndpoint): ApiConfigurationEndpointsView => ({
  httpMethod: item.httpMethod,
  type: item.type,
})