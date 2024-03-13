import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtGqlAuthenticationGuard } from 'dx-nest-core/auth'
import { ApiConfigurationService } from './api-configuration.service'
import { IdentityResponse, PageableRequest } from '../../shared/type'
import { ApiConfigurationDto } from '../dto/api-configuration.dto'
import { VoidResolver } from 'graphql-scalars'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { RequestContext } from '../../shared/service/request-context'
import { ApiConfiguration } from '../schema/api-configuration'
import { ApiConfigurationPageableResponse, ApiConfigurationView } from '../dto/api-configuration.view'
import { DataModel } from '../../data/schema/data-model'
import { assembleApiConfiguration } from '../dto/assemble-api-configuration'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver(() => ApiConfigurationView)
export class ApiConfigurationResolver {
  constructor(
    @InjectModel(ApiConfiguration.name) private apiConfigurationModel: Model<ApiConfiguration>,
    private requestContext: RequestContext,
    private apiConfigurationService: ApiConfigurationService,
  ) {
  }

  @Mutation(() => IdentityResponse, {name: 'apiConfigurationCreate'})
  create(
    @Args('dto', {type: () => ApiConfigurationDto}) dto: ApiConfigurationDto,
  ): Promise<IdentityResponse> {
    return this.apiConfigurationService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'apiConfigurationUpdate'})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => ApiConfigurationDto}) dto: ApiConfigurationDto,
  ): Promise<void> {
    return this.apiConfigurationService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'apiConfigurationRemove'})
  remove(
    @Args('id', {type: () => String}) id: string,
  ): Promise<void> {
    return this.apiConfigurationService.remove(id)
  }

  @Query(() => ApiConfigurationPageableResponse, {name: 'apiConfigurationsFind'})
  async find(
    @Args('request', {type: () => PageableRequest}) {take, skip}: PageableRequest,
  ): Promise<ApiConfigurationPageableResponse> {
    const filter: FilterQuery<ApiConfiguration> = {
      createdBy: {
        _id: this.requestContext.authenticatedUser.id,
      }
    }

    const entities = await this.apiConfigurationModel.find(filter, {},
      {
        limit: take,
        skip,
        populate: ['createdBy', 'dataModal'],
      })

    const count = await this.apiConfigurationModel.count(filter)

    return {
      data: entities.map(assembleApiConfiguration),
      count,
    }
  }

  @Query(() => ApiConfigurationView, {name: 'apiConfigurationFindById'})
  async findById(
    @Args('id') id: string
  ): Promise<ApiConfigurationView> {
    const filter: FilterQuery<DataModel> = {
      createdBy: {
        _id: this.requestContext.authenticatedUser.id,
      },
      _id: id,
    }

    const entity = await this.apiConfigurationModel.findOne(filter, {},
      {
        populate: ['createdBy', 'dataModel']
      })

    return  assembleApiConfiguration(entity)
  }
}