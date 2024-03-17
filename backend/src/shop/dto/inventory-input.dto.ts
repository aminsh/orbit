import { InventoryType } from '../schema/enums'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsDateString, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator'
import { InventoryLineDto } from './inventory-line.dto'
import { Type } from 'class-transformer'

@ObjectType()
export class InventoryInputDto {
  @Field(() => Date)
  @IsDateString()
  date: Date

  @Field(() => InventoryType)
  @IsEnum(InventoryType)
  type: InventoryType

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  supplierId: string

  @Field(() => [InventoryLineDto])
  @Type(() => InventoryLineDto)
  @ValidateNested({each: true})
  lines: []
}