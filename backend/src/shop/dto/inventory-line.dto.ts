import {Field, Float, InputType} from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class InventoryLineDto {
  @Field(() => String)
  @IsString()
  productId: string

  @Field(() => Float)
  @IsNumber()
  quantity: number
}