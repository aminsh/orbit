import {UserView} from 'src/user/dto/user.view'
import {StorageStatus, StorageType} from '../schema/enums'
import {Field, InputType, ObjectType, registerEnumType} from '@nestjs/graphql'
import {PageableRequest, PageableResponseBase} from 'src/shared/type'
import {IsOptional, IsString} from 'class-validator'

registerEnumType(StorageType, {
  name: 'StorageType',
})

registerEnumType(StorageStatus, {
  name: 'StorageStatus',
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

  @Field()
  name: string
}


@ObjectType()
export class DataStoragePageableResponse extends PageableResponseBase<DataStorageView> {
  @Field(() => [DataStorageView])
  data: DataStorageView[]
}

@InputType()
export class DataStoragePageableRequest extends PageableRequest {
  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  search: string
}