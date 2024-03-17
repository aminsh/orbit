import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@ObjectType()
export class PersonDto {
  @Field(() => Boolean)
  @IsBoolean()
  isCustomer: boolean

  @Field(() => Boolean)
  @IsBoolean()
  isSupplier: boolean

  @Field(() => String)
  @IsBoolean()
  title: string
}