import { Field, ObjectType } from '@nestjs/graphql'
import { HttpMethod } from '../../shared/type'
import { ApiType } from '../api.enums'

@ObjectType()
export class ApiConfigurationEndpointsView {
  @Field(() => HttpMethod)
  httpMethod: HttpMethod

  @Field(() => ApiType)
  type: ApiType
}