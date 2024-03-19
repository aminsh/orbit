import {Field, Float, Int, ObjectType} from '@nestjs/graphql'
import {IsNumber, IsString} from 'class-validator'

@ObjectType()
export class OrderLineDto {
  @Field(() => Int)
  @IsNumber()
  row: number

  @Field(() => String)
  @IsString()
  productId: string

  @Field(() => Float)
  @IsNumber()
  quantity: number

  @Field(() => Float)
  @IsNumber()
  unitPrice: number
}