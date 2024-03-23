import {Field, InputType} from '@nestjs/graphql'
import {IsBoolean, IsOptional, IsString} from 'class-validator'

@InputType()
export class PersonDto {
  @Field(() => Boolean, {nullable: true})
  @IsBoolean()
  @IsOptional()
  isCustomer: boolean

  @Field(() => Boolean, {nullable: true})
  @IsBoolean()
  @IsOptional()
  isSupplier: boolean

  @Field(() => String)
  @IsString()
  title: string
}