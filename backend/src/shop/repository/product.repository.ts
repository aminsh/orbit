import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { Repository } from '../../shared/type'
import { Product } from '../schema/product'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class ProductRepository implements Repository<Product> {
  constructor(
    @InjectModel(Product.name) private model: Model<Product>,
  ) {
  }

  findOne(filter: FilterQuery<Product>, projection?: ProjectionType<Product>, options?: QueryOptions<Product>): Promise<Product> {
    return this.model.findOne(filter, projection, options)
  }

  find(filter: FilterQuery<Product>, projection?: ProjectionType<Product>, options?: QueryOptions<Product>): Promise<Product[]> {
    return this.model.find(filter, projection, options)
  }

  create(entity: Product): Promise<Product> {
    const data = new this.model(entity)
    return data.save()
  }

  async update(entity: Product): Promise<void> {
    await this.model.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: Product): Promise<void> {
    await this.model.deleteOne({_id: entity._id})
  }
}