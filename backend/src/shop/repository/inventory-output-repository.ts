import { Repository } from '../../shared/type'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InventoryOutput } from '../schema/inventory-output'

@Injectable()
export class InventoryOutputRepository implements Repository<InventoryOutput> {
  constructor(
    @InjectModel(InventoryOutput.name) private model: Model<InventoryOutput>,
  ) {
  }

  findOne(filter: FilterQuery<InventoryOutput>, projection?: ProjectionType<InventoryOutput>, options?: QueryOptions<InventoryOutput>): Promise<InventoryOutput> {
    return this.model.findOne(filter, projection, options)
  }

  find(filter: FilterQuery<InventoryOutput>, projection?: ProjectionType<InventoryOutput>, options?: QueryOptions<InventoryOutput>): Promise<InventoryOutput[]> {
    return this.model.find(filter, projection, options)
  }

  create(entity: InventoryOutput): Promise<InventoryOutput> {
    const data = new this.model(entity)
    return data.save()
  }

  async update(entity: InventoryOutput): Promise<void> {
    await this.model.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: InventoryOutput): Promise<void> {
    await this.model.deleteOne({_id: entity._id})
  }
}