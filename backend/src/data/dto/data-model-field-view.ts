import { ObjectType, Field } from "@nestjs/graphql"
import { DataModelFieldType } from "../schema/enums"

@ObjectType()
export class DataModelFieldView {
  @Field(() => String)
  name: string

  @Field(() => String)
  label: string

  @Field(() => DataModelFieldType)
  type: DataModelFieldType

  @Field(() => Boolean)
  required: boolean
}