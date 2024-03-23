import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {IdentityResponse} from '../../shared/type'
import {UseGuards} from '@nestjs/common'
import {JwtGqlAuthenticationGuard} from 'dx-nest-core/auth'
import {VoidResolver} from 'graphql-scalars'
import {InventoryOutputService} from '../service/inventory-output.service'
import {InventoryOutputDto} from '../dto/inventory-output.dto'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver()
export class InventoryOutputResolver {
  constructor(
    private inventoryInputService: InventoryOutputService,
  ) {
  }

  @Mutation(() => IdentityResponse, {name: 'inventoryOutputCreate', nullable: true})
  create(
    @Args('dto', {type: () => InventoryOutputDto}) dto: InventoryOutputDto,
  ): Promise<IdentityResponse> {
    return this.inventoryInputService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'inventoryOutputUpdate', nullable: true})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => InventoryOutputDto}) dto: InventoryOutputDto,
  ) {
    return this.inventoryInputService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'inventoryOutputRemove', nullable: true})
  remove(
    @Args('id', {type: () => String}) id: string,
  ) {
    return this.inventoryInputService.remove(id)
  }
}