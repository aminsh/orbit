import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {IdentityResponse} from '../../shared/type'
import {UseGuards} from '@nestjs/common'
import {JwtGqlAuthenticationGuard} from 'dx-nest-core/auth'
import {VoidResolver} from 'graphql-scalars'
import {InventoryInputDto} from '../dto/inventory-input.dto'
import {InventoryInputService} from '../service/inventory-input.service'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver()
export class InventoryInputResolver {
  constructor(
    private inventoryInputService: InventoryInputService,
  ) {
  }

  @Mutation(() => IdentityResponse, {name: 'inventoryInputCreate', nullable: true})
  create(
    @Args('dto', {type: () => InventoryInputDto}) dto: InventoryInputDto,
  ): Promise<IdentityResponse> {
    return this.inventoryInputService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'inventoryInputUpdate', nullable: true})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => InventoryInputDto}) dto: InventoryInputDto,
  ) {
    return this.inventoryInputService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'inventoryInputRemove', nullable: true})
  remove(
    @Args('id', {type: () => String}) id: string,
  ) {
    return this.inventoryInputService.remove(id)
  }
}