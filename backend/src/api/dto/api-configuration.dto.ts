import { IsString, ValidateNested } from 'class-validator'
import { Field } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ApiConfigurationEndpointDto } from './api-configuration-endpoint.dto'

export class ApiConfigurationDto {
  @Field()
  @IsString()
  dataModelId: string

  @Field()
  @IsString()
  prefix: string

  @Field(() => [ApiConfigurationEndpointDto])
  @Type(() => ApiConfigurationEndpointDto)
  @ValidateNested({each: true})
  endpoints: ApiConfigurationEndpointDto[]
}