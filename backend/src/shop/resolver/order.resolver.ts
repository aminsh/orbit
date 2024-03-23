import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {OrderService} from '../service/order.service'
import {IdentityResponse} from '../../shared/type'
import {OrderDto} from '../dto/order.dto'
import {UseGuards} from '@nestjs/common'
import {JwtGqlAuthenticationGuard} from 'dx-nest-core/auth'
import {VoidResolver} from 'graphql-scalars'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver()
export class OrderResolver {
  constructor(
    private orderService: OrderService,
  ) {
  }

  @Mutation(() => IdentityResponse, {name: 'orderCreate', nullable: true})
  create(
    @Args('dto', {type: () => OrderDto}) dto: OrderDto,
  ): Promise<IdentityResponse> {
    return this.orderService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'orderUpdate', nullable: true})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => OrderDto}) dto: OrderDto,
  ) {
    return this.orderService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'orderRemove', nullable: true})
  remove(
    @Args('id', {type: () => String}) id: string,
  ) {
    return this.orderService.remove(id)
  }
}