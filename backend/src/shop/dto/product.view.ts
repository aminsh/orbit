import { UserView } from '../../user/dto/user.view'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PageableResponseBase } from '../../shared/type'

@ObjectType()
export class ProductView {
  @Field(() => UserView)
  createdBy: UserView

  @Field(() => String)
  id: string

  @Field(() => String)
  sku: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => Int)
  quantity: number
}

@ObjectType()
export class ProductPageableResponse extends PageableResponseBase<ProductView> {
  @Field(() => [ProductView])
  data: ProductView[]
}
