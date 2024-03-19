import { Field, ObjectType } from '@nestjs/graphql'
import { IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator'
import { InventoryLineDto } from './inventory-line.dto'
import { Type } from 'class-transformer'

@ObjectType()
export class InventoryInputDto {
  @Field(() => Date)
  @IsDateString()
  date: Date

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  supplierId: string

  @Field(() => [InventoryLineDto])
  @Type(() => InventoryLineDto)
  @ValidateNested({each: true})
  lines: []
}