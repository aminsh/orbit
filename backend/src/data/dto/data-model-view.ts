import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { DataModelFieldType } from '../schema/enums'
import { UserView } from 'src/user/dto/user.view'
import { DataModelFieldView } from './data-model-field-view'
import { DataStorageView } from './data-storage.view'
import { PageableResponseBase } from 'src/shared/type'

registerEnumType(DataModelFieldType, {
  name: 'DataModelFieldType'
})

@ObjectType()
export class DataModelView {
  @Field(() => String)
  id: string

  @Field(() => UserView)
  createdBy: UserView

  @Field(() => String)
  name: string

  @Field(() => [DataModelFieldView])
  fields: DataModelFieldView[]

  @Field(() => DataStorageView)
  dataStorage: DataStorageView
}


@ObjectType()
export class DataModelPageabeResponse extends PageableResponseBase<DataModelView> {
  @Field(() => [DataModelView])
  data: DataModelView[]
}