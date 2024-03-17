import { Repository } from '../../shared/type'
import { InventoryInput } from '../schema/inventory-input'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InventoryInputRepository implements Repository<InventoryInput> {
  constructor(
    @InjectModel(InventoryInput.name) private model: Model<InventoryInput>,
  ) {
  }

  findOne(filter: FilterQuery<InventoryInput>, projection?: ProjectionType<InventoryInput>, options?: QueryOptions<InventoryInput>): Promise<InventoryInput> {
    return this.model.findOne(filter, projection, options)
  }

  find(filter: FilterQuery<InventoryInput>, projection?: ProjectionType<InventoryInput>, options?: QueryOptions<InventoryInput>): Promise<InventoryInput[]> {
    return this.model.find(filter, projection, options)
  }

  create(entity: InventoryInput): Promise<InventoryInput> {
    const data = new this.model(entity)
    return data.save()
  }

  async update(entity: InventoryInput): Promise<void> {
    await this.model.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: InventoryInput): Promise<void> {
    await this.model.deleteOne({_id: entity._id})
  }
}