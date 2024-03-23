import {Field, InputType, ObjectType} from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class ProductDto {
  @Field(() => String)
  @IsString()
  sku: string

  @Field(() => String)
  @IsString()
  title: string

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  description: string
}