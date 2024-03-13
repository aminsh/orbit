import { HttpMethod } from '../../shared/type'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ApiType } from '../api.enums'
import { IsEnum } from 'class-validator'

registerEnumType(ApiType, {name: 'ApiType'})
registerEnumType(HttpMethod, {name: 'HttpMethod'})

@InputType()
export class ApiConfigurationEndpointDto {
  @Field(() => HttpMethod)
  @IsEnum(HttpMethod)
  httpMethod: HttpMethod

  @Field(() => ApiType)
  @IsEnum(ApiType)
  type: ApiType
}