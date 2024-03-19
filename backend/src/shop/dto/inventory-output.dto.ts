import { Field, ObjectType } from '@nestjs/graphql'
import { IsDateString, ValidateNested } from 'class-validator'
import { InventoryLineDto } from './inventory-line.dto'
import { Type } from 'class-transformer'

@ObjectType()
export class InventoryOutputDto {
  @Field(() => Date)
  @IsDateString()
  date: Date

  @Field(() => [InventoryLineDto])
  @Type(() => InventoryLineDto)
  @ValidateNested({each: true})
  lines: []
}