import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HttpMethod } from '../../shared/type'
import { ApiType } from '../api.enums'

@Schema({_id: false})
export class ApiConfigurationEndpoint {
  @Prop({type: Object.values(HttpMethod)})
  httpMethod: HttpMethod

  @Prop({type: Object.values(ApiType)})
  type: ApiType
}

export const ApiConfigurationEndpointSchema = SchemaFactory.createForClass(ApiConfigurationEndpoint)

