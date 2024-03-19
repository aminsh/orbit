import {Injectable, NotFoundException, Scope} from '@nestjs/common'
import {RequestContext} from '../../shared/service/request-context'
import {ProductRepository} from '../repository/product.repository'
import {ProductDto} from '../dto/product.dto'
import {Identity} from '../../shared/type'
import {Product} from '../schema/product'
import {User} from '../../user/shema/user'

@Injectable({scope: Scope.REQUEST})
export class ProductService {
  constructor(
    private requestContext: RequestContext,
    private productRepository: ProductRepository,
  ) {
  }

  async create(dto: ProductDto): Promise<Identity> {
    const entity = new Product()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.sku = dto.sku
    entity.title = dto.title
    entity.description = dto.description

    const result = await this.productRepository.create(entity)

    return {id: result._id}
  }

  async update(id: string, dto: ProductDto): Promise<void> {
    const entity = await this.fetchOrThrow(id)

    entity.title = dto.title
    entity.description = dto.description

    await this.productRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.productRepository.remove(entity)
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