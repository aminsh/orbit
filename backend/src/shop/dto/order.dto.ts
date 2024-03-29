import {Field, InputType} from '@nestjs/graphql'
import {OrderLineDto} from './order-line.dto'
import {IsDateString, IsString, ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

@InputType()
export class OrderDto {
  @Field(() => Date)
  @IsDateString()
  date: Date

  @Field(() => String)
  @IsString()
  customerId: string

  @Field(() => [OrderLineDto])
  @Type(() => OrderLineDto)
  @ValidateNested({each: true})
  lines: OrderLineDto[]
}