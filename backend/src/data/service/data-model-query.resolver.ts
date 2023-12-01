import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InsertResponse, QueryFindAndCountResponse } from '../data.type'
import { GraphQLJSON, VoidResolver } from 'graphql-scalars'
import { DataModelQueryService } from './postgres/data-model-query.service'

@Resolver()
export class DataModelQueryResolver {
  constructor(
    private dataModelQueryService: DataModelQueryService,
  ) {}

  @Mutation(() => InsertResponse, { name: 'dataModelQueryInsert' })
  insert(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => GraphQLJSON }) data: any,
  ): Promise<InsertResponse> {
    return this.dataModelQueryService.insert(id, data)
  }

  @Mutation(() => [ InsertResponse ], { name: 'dataModelQueryInsertMany' })
  insertMany(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => [ GraphQLJSON ] }) data: any,
  ): Promise<InsertResponse[]> {
    return this.dataModelQueryService.insertMany(id, data)
  }

  @Mutation(() => VoidResolver, { name: 'dataModelQueryUpdate', nullable: true })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('where', { type: () => GraphQLJSON }) where: any,
    @Args('data', { type: () => GraphQLJSON }) data: any,
  ): Promise<void> {
    return this.dataModelQueryService.update(id, where, data)
  }

  @Mutation(() => VoidResolver, { name: 'dataModelQueryDelete', nullable: true })
  delete(
    @Args('id', { type: () => String }) id: string,
    @Args('where', { type: () => GraphQLJSON }) where: any,
  ): Promise<void> {
    return this.dataModelQueryService.delete(id, where)
  }

  @Query(() => QueryFindAndCountResponse, { name: 'dataModelQueryFind' })
  find(
    @Args('id', { type: () => String }) id: string,
    @Args('query', { type: () => GraphQLJSON, nullable: true }) query: any,
  ): Promise<QueryFindAndCountResponse> {
    return this.dataModelQueryService.find(id, query)
  }

  @Query(() => GraphQLJSON, { name: 'dataModelQueryFindOne' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Args('query', { type: () => GraphQLJSON }) query: any,
  ): Promise<any> {
    return this.dataModelQueryService.findOne(id, query)
  }
}
