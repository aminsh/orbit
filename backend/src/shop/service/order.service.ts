import {RequestContext} from '../../shared/service/request-context'
import {OrderRepository} from '../repository/order.repository'
import {PersonRepository} from '../repository/person.repository'
import {ProductRepository} from '../repository/product.repository'
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
import {OrderDto} from '../dto/order.dto'
import {Identity} from '../../shared/type'
import {Order} from '../schema/order'
import {User} from '../../user/shema/user'
import {SHOP_MESSAGE} from '../shop.contants'
import {OrderLineDto} from '../dto/order-line.dto'

@Injectable()
export class OrderService {
  constructor(
    private requestContext: RequestContext,
    private orderRepository: OrderRepository,
    private personRepository: PersonRepository,
    private productRepository: ProductRepository,
  ) {
  }

  async create(dto: OrderDto): Promise<Identity> {
    const entity = new Order()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    const last = (await this.orderRepository.findOne(
      {},
      {number: 1,},
      {
        sort: {number: -1}
      }))
    entity.number = (last.number ?? 1000) + 1
    entity.date = dto.date

    await this.resolveCustomer(entity, dto.customerId)
    await this.resolveLines(entity, dto.lines)

    const result = await this.orderRepository.create(entity)

    return {id: result._id}
  }

  async update(id: string, dto: OrderDto) {
    const entity = await this.fetchOrThrow(id)

    entity.date = dto.date

    await this.resolveCustomer(entity, dto.customerId)
    await this.resolveLines(entity, dto.lines)

    await this.orderRepository.update(entity)
  }

  async remove(id: string) {
    const entity = await this.fetchOrThrow(id)
    await this.orderRepository.remove(entity)
  }

  private async fetchOrThrow(id: string): Promise<Order> {
    const entity = await this.orderRepository.findOne({
      _id: id,
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }

  private async resolveCustomer(entity: Order, customerId: string) {
    entity.customer = await this.personRepository.findOne({
      _id: customerId,
    }, {_id: 1})

    if (!entity.customer)
      throw new BadRequestException(SHOP_MESSAGE.CUSTOMER_IS_INVALID)
  }

  private async resolveLines(entity: Order, lines: OrderLineDto[]): Promise<void> {
    const products = await this.productRepository.find({
      _id: {
        $in: lines.map(ln => ln.productId),
      }
    }, {
      _id: 1
    })

    if (products.length !== lines.length)
      throw new BadRequestException(SHOP_MESSAGE.PRODUCTS_IS_INVALID)

    entity.lines = lines.map(ln => ({
      row: ln.row,
      product: products.find(p => p._id === ln.productId),
      quantity: ln.quantity,
      unitPrice: ln.unitPrice,
    }))
  }
}