import {RequestContext} from '../../shared/service/request-context'
import {Identity} from '../../shared/type'
import {InventoryInput} from '../schema/inventory-input'
import {User} from '../../user/shema/user'
import {PersonRepository} from '../repository/person.repository'
import {BadRequestException, Injectable, NotFoundException, Scope} from '@nestjs/common'
import {SHOP_MESSAGE} from '../shop.contants'
import {InventoryLineDto} from '../dto/inventory-line.dto'
import {ProductRepository} from '../repository/product.repository'
import {InventoryOutputRepository} from '../repository/inventory-output-repository'
import {InventoryOutputDto} from '../dto/inventory-output.dto'
import {InventoryOutput} from '../schema/inventory-output'

@Injectable({scope: Scope.REQUEST})
export class InventoryOutputService {
  constructor(
    private requestContext: RequestContext,
    private inventoryOutputRepository: InventoryOutputRepository,
    private productRepository: ProductRepository,
  ) {
  }

  async create(dto: InventoryOutputDto): Promise<Identity> {
    const entity = new InventoryOutput()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.date = dto.date

    const last = (await this.inventoryOutputRepository.findOne(
      {},
      {number: 1,},
      {
        sort: {number: -1}
      }))
    entity.number = (last.number ?? 1000) + 1

    await this.resolveLines(entity, dto.lines)

    const result = await this.inventoryOutputRepository.create(entity)

    return {id: result._id}
  }

  async update(id: string, dto: InventoryOutputDto): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.resolveLines(entity, dto.lines)
    await this.inventoryOutputRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.inventoryOutputRepository.remove(entity)
  }

  private async fetchOrThrow(id: string): Promise<InventoryInput> {
    const entity = await this.inventoryOutputRepository.findOne({
      _id: id,
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }

  private async resolveLines(entity: InventoryOutput, lines: InventoryLineDto[]): Promise<void> {
    const products = await this.productRepository.find({
        _id: {
          $in: lines.map(ln => ln.productId)
        }
      },
      {
        _id: 1
      })

    if (lines.length !== products.length)
      throw new BadRequestException(SHOP_MESSAGE.PRODUCTS_IS_INVALID)

    entity.lines = lines.map(ln => ({
      product: products.find(p => p._id === ln.productId),
      quantity: ln.quantity,
    }))
  }
}