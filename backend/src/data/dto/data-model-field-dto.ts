import { DataModelFieldType } from '../schema/enums'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DataModelFieldDto {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsOptional()
  label: string

  @Field(() => DataModelFieldType)
  @IsOptional()
  @IsEnum(DataModelFieldType)
  type: DataModelFieldType

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  required: boolean
}
