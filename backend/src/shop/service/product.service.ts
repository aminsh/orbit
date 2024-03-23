import {Injectable, NotFoundException, Scope} from '@nestjs/common'
import {RequestContext} from '../../shared/service/request-context'
import {ProductRepository} from '../repository/product.repository'
import {ProductDto} from '../dto/product.dto'
import {Identity} from '../../shared/type'
import {Product} from '../schema/product'
import {User} from '../../user/shema/user'
import {EventEmitter2} from '@nestjs/event-emitter'
import {SHOP_EVENT} from '../shop.contants'

@Injectable({scope: Scope.REQUEST})
export class ProductService {
  constructor(
    private requestContext: RequestContext,
    private productRepository: ProductRepository,
    private eventEmitter: EventEmitter2,
  ) {
  }

  async create(dto: ProductDto): Promise<Identity> {
    const entity = new Product()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.sku = dto.sku
    entity.title = dto.title
    entity.description = dto.description

    const {_id: id} = await this.productRepository.create(entity)
    const result = {id}

    this.eventEmitter.emit(SHOP_EVENT.PRODUCT_CREATED, result)

    return result
  }

  async update(id: string, dto: ProductDto): Promise<void> {
    const entity = await this.fetchOrThrow(id)

    entity.title = dto.title
    entity.description = dto.description

    await this.productRepository.update(entity)

    this.eventEmitter.emit(SHOP_EVENT.PRODUCT_UPDATED, {id})
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.productRepository.remove(entity)

    this.eventEmitter.emit(SHOP_EVENT.PRODUCT_REMOVED, {id})
  }

  private async fetchOrThrow(id: string): Promise<Product> {
    const entity = await this.productRepository.findOne({
      _id: id,
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }
}