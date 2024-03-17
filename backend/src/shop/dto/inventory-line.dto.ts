import { Field, Float, ObjectType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@ObjectType()
export class InventoryLineDto {
  @Field(() => String)
  @IsString()
  productId: string

  @Field(() => Float)
  @IsNumber()
  quantity: number
}