import { IsString, ValidateNested } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { DataModelFieldDto } from './data-model-field-dto'

@InputType()
export class DataModelDto {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => [ DataModelFieldDto ])
  @Type(() => DataModelFieldDto)
  @ValidateNested({ each: true })
  fields: DataModelFieldDto[]

  @Field()
  @IsString()
  dataStorageId: string
}

