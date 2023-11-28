import { UserView } from 'src/user/dto/user.view'
import { StorageStatus, StorageType } from '../schema/enums'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { PageableResponseBase } from 'src/shared/type'

registerEnumType(StorageType, {
  name: 'StorageType'
})

registerEnumType(StorageStatus, {
  name: 'StorageStatus'
})

@ObjectType()
export class DataStorageView {
  @Field(() => String)
  id: string

  @Field(() => UserView)
  createdBy: UserView

  @Field(() => StorageType)
  type: StorageType

  @Field(() => StorageStatus)
  status: StorageStatus
}


@ObjectType()
export class DataStoragePageableResponse extends PageableResponseBase<DataStorageView> {
  @Field(() => [DataStorageView])
  data: DataStorageView[]
}