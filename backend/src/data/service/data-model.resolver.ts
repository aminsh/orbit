
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { DataModelPageabeResponse, DataModelView } from '../dto/data-model-view'
import { InjectModel } from '@nestjs/mongoose'
import { DataModel } from '../schema/data-model'
import { FilterQuery, Model } from 'mongoose'
import { JwtGqlAuthenticationGuard } from 'dx-nest-core/auth'
import { UseGuards } from '@nestjs/common'
import { RequestContext } from 'src/shared/service/request-context'
import { DataModelService } from './data-model.service'
import { IdentityResponse, PageableRequest } from 'src/shared/type'
import { DataModelDto } from '../dto/data-model-dto'
import { GraphQLJSON, VoidResolver } from 'graphql-scalars'
import { assembleDataModel } from '../dto/assemble-date-model'
import { InsertResponse } from '../data.type'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver(() => DataModelView)
export class DataModelResolver {
  constructor(
    @InjectModel(DataModel.name) private dataModel: Model<DataModel>,
    private requestContext: RequestContext,
    private dataModelSerivice: DataModelService,
  ) { }

  @Mutation(() => IdentityResponse, { name: 'dataModelCreate' })
  async create(
    @Args('dto', { type: () => DataModelDto }) dto: DataModelDto,
  ): Promise<IdentityResponse> {
    return this.dataModelSerivice.create(dto)
  }

  @Mutation(() => VoidResolver, { name: 'dataModelUpdate', nullable: true })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('dto', { type: () => DataModelDto }) dto: DataModelDto,
  ): Promise<void> {
    return this.dataModelSerivice.update(id, dto)
  }

  @Mutation(() => VoidResolver, { name: 'dataModelRemove', nullable: true })
  async remove(
    @Args('id', { type: () => String }) id: string,
  ): Promise<void> {
    return this.dataModelSerivice.remove(id)
  }

  @Mutation(() => InsertResponse, { name: 'dataModelInsert', nullable: true })
  async insert(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => GraphQLJSON }) data: any,
  ): Promise<InsertResponse> {
    return this.dataModelSerivice.insert(id, data)
  }

  @Query(() => DataModelPageabeResponse, { name: 'dataModelsFind' })
  async find(
    @Args('request', { type: () => PageableRequest }) { take, skip }: PageableRequest,
  ): Promise<DataModelPageabeResponse> {
    const filter: FilterQuery<DataModel> = {
      createdBy: {
        _id: this.requestContext.authenticatedUser.id,
      }
    }

    const entities = await this.dataModel.find(filter, {},
      {
        limit: take,
        skip,
        populate: ['createdBy', 'dataStorage']
      })

    const count = await this.dataModel.count(filter)

    return {
      data: entities.map(assembleDataModel),
      count,
    }
  }
}