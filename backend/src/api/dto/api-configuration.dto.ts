import { IsString, ValidateNested } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ApiConfigurationEndpointDto } from './api-configuration-endpoint.dto'

@InputType()
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