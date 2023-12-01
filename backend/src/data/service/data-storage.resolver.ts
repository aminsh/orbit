import { InjectModel } from '@nestjs/mongoose'
import { DataStorage } from '../schema/data-storage'
import { FilterQuery, Model } from 'mongoose'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DataStorageDto } from '../dto/data-storage.dto'
import { IdentityResponse, PageableRequest } from 'src/shared/type'
import { DataStorageService } from './data-storage.service'
import { DataStoragePageableResponse, DataStorageView } from '../dto/data-storage.view'
import { RequestContext } from 'src/shared/service/request-context'
import { assembleDataStorage } from '../dto/assemble-data-storage'
import { UseGuards } from '@nestjs/common'
import { JwtGqlAuthenticationGuard } from 'dx-nest-core/auth'
import { VoidResolver } from 'graphql-scalars'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver(() => DataStorageView)
export class DataStorageResolver {
  constructor(
    @InjectModel(DataStorage.name) private dataStorageModel: Model<DataStorage>,
    private dataStorageService: DataStorageService,
    private requestContext: RequestContext,
  ) { }

  @Mutation(() => IdentityResponse, { name: 'dataStorageCreate', nullable: true })
  create(
    @Args('dto', { type: () => DataStorageDto }) dto: DataStorageDto
  ): Promise<IdentityResponse> {
    return this.dataStorageService.create(dto)
  }

  @Mutation(() => VoidResolver, { name: 'dataStorageInitialize', nullable: true })
  initialize(
    @Args('id', { type: () => String }) id: string,
  ): Promise<void> {
    return this.dataStorageService.initialize(id)
  }

  @Mutation(() => VoidResolver, { name: 'dataStorageSynchronize', nullable: true })
  synchronize(
    @Args('id', { type: () => String }) id: string,
  ): Promise<void> {
    return this.dataStorageService.synchronize(id)
  }

  @Query(() => DataStoragePageableResponse, { name: 'dataStoragesFind' })
  async find(
    @Args('request', { type: () => PageableRequest }) { take, skip }: PageableRequest,
  ): Promise<DataStoragePageableResponse> {
    const filter: FilterQuery<DataStorage> = {
      createdBy: {
        _id: this.requestContext.authenticatedUser.id,
      }
    }

    const entities = await this.dataStorageModel.find(filter, {},
      {
        limit: take,
        skip,
        populate: 'createdBy'
      })

    const count = await this.dataStorageModel.count(filter)

    return {
      data: entities.map(assembleDataStorage),
      count,
    }
  }
}
