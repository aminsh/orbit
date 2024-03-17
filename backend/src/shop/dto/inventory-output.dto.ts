import { InventoryType } from '../schema/enums'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsDateString, IsEnum, ValidateNested } from 'class-validator'
import { InventoryLineDto } from './inventory-line.dto'
import { Type } from 'class-transformer'

@ObjectType()
export class InventoryOutputDto {
  @Field(() => Date)
  @IsDateString()
  date: Date

  @Field(() => InventoryType)
  @IsEnum(InventoryType)
  type: InventoryType

  @Field(() => [InventoryLineDto])
  @Type(() => InventoryLineDto)
  @ValidateNested({each: true})
  lines: []
}