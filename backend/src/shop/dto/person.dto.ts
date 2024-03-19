import {Field, ObjectType} from '@nestjs/graphql'
import {IsBoolean, IsOptional} from 'class-validator'

@ObjectType()
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
  @IsBoolean()
  title: string
}