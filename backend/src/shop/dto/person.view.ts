import {Field, ObjectType} from '@nestjs/graphql'
import {UserView} from '../../user/dto/user.view'

@ObjectType()
export class PersonView {
  @Field(() => UserView)
  createdBy: UserView

  @Field(() => String)
  id: string

  @Field(() => Boolean)
  isCustomer: boolean

  @Field(() => Boolean)
  isSupplier: boolean

  @Field(() => String)
  title: string
}