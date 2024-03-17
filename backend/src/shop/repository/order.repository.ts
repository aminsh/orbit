import { Repository } from '../../shared/type'
import { Order } from '../schema/order'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'

@Injectable()
export class OrderRepository implements Repository<Order> {
  constructor(
    @InjectModel(Order.name) private model: Model<Order>,
  ) {
  }

  findOne(filter: FilterQuery<Order>, projection?: ProjectionType<Order>, options?: QueryOptions<Order>): Promise<Order> {
    return this.model.findOne(filter, projection, options)
  }

  find(filter: FilterQuery<Order>, projection?: ProjectionType<Order>, options?: QueryOptions<Order>): Promise<Order[]> {
    return this.model.find(filter, projection, options)
  }

  create(entity: Order): Promise<Order> {
    const data = new this.model(entity)
    return data.save()
  }

  async update(entity: Order): Promise<void> {
    await this.model.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: Order): Promise<void> {
    await this.model.deleteOne({_id: entity._id})
  }
}