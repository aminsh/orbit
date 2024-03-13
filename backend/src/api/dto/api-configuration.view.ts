import { Field, ObjectType } from '@nestjs/graphql'
import { UserView } from '../../user/dto/user.view'
import { DataModelView } from '../../data/dto/data-model-view'
import { ApiConfigurationEndpointsView } from './api-configuration-endpoints.view'
import { PageableResponseBase } from '../../shared/type'

@ObjectType()
export class ApiConfigurationView {
  @Field(() => String)
  id: string

  @Field(() => UserView)
  createdBy: UserView

  @Field(() => DataModelView)
  dataModal: DataModelView

  @Field(() => String)
  prefix: string

  @Field(() => [ApiConfigurationEndpointsView])
  endpoints: ApiConfigurationEndpointsView[]
}

@ObjectType()
export class ApiConfigurationPageableResponse extends PageableResponseBase<ApiConfigurationView> {
  @Field(() => [ApiConfigurationView])
  data: ApiConfigurationView[]
}