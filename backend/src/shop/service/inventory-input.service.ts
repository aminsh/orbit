import {RequestContext} from '../../shared/service/request-context'
import {InventoryInputDto} from '../dto/inventory-input.dto'
import {Identity} from '../../shared/type'
import {InventoryInput} from '../schema/inventory-input'
import {User} from '../../user/shema/user'
import {InventoryInputRepository} from '../repository/inventory-input-repository'
import {PersonRepository} from '../repository/person.repository'
import {BadRequestException, Injectable, NotFoundException, Scope} from '@nestjs/common'
import {SHOP_EVENT, SHOP_MESSAGE} from '../shop.contants'
import {InventoryLineDto} from '../dto/inventory-line.dto'
import {ProductRepository} from '../repository/product.repository'
import {EventEmitter2} from '@nestjs/event-emitter'

@Injectable({scope: Scope.REQUEST})
export class InventoryInputService {
  constructor(
    private requestContext: RequestContext,
    private inventoryInputRepository: InventoryInputRepository,
    private personRepository: PersonRepository,
    private productRepository: ProductRepository,
    private eventEmitter: EventEmitter2,
  ) {
  }

  async create(dto: InventoryInputDto): Promise<Identity> {
    const entity = new InventoryInput()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.date = dto.date ?? new Date()

    const last = (await this.inventoryInputRepository.findOne(
      {},
      {number: 1,},
      {
        sort: {number: -1}
      }))
    entity.number = (last?.number ?? 1000) + 1

    await this.resolveSupplier(entity, dto.supplierId)
    await this.resolveLines(entity, dto.lines)

    const result = await this.inventoryInputRepository.create(entity)

    dto.lines.forEach((ln: InventoryLineDto) =>
      this.eventEmitter.emit(SHOP_EVENT.PRODUCT_INVENTORY_CHANGED, {id: ln.productId}))


    return {id: result._id}
  }

  async update(id: string, dto: InventoryInputDto): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.resolveSupplier(entity, dto.supplierId)
    await this.resolveLines(entity, dto.lines)
    await this.inventoryInputRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.inventoryInputRepository.remove(entity)
  }

  private async fetchOrThrow(id: string): Promise<InventoryInput> {
    const entity = await this.inventoryInputRepository.findOne({
      _id: id,
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }

  private async resolveSupplier(entity: InventoryInput, supplierId: string): Promise<void> {
    if (!supplierId)
      return

    const supplier = await this.personRepository.findOne({
        _id: supplierId,
      },
      {
        _id: 1,
      })

    if (!supplier)
      throw new BadRequestException(SHOP_MESSAGE.SUPPLIER_IS_INVALID)

    entity.supplier = supplier
  }

  private async resolveLines(entity: InventoryInput, lines: InventoryLineDto[]): Promise<void> {
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
      product: products.find(p => p._id.toString() === ln.productId),
      quantity: ln.quantity,
    }))
  }
}