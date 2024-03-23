import {Field, InputType} from '@nestjs/graphql'
import {IsDateString, IsOptional, ValidateNested} from 'class-validator'
import {InventoryLineDto} from './inventory-line.dto'
import {Type} from 'class-transformer'

@InputType()
export class InventoryOutputDto {
  @Field(() => Date, {nullable: true})
  @IsDateString()
  @IsOptional()
  date: Date

  @Field(() => [InventoryLineDto])
  @Type(() => InventoryLineDto)
  @ValidateNested({each: true})
  lines: []
}