import { Repository } from 'src/shared/type'
import { DataStorage } from '../schema/data-storage'
import { FilterQuery, Model, ProjectionType } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DataStorageRepository implements Repository<DataStorage> {
  constructor(
    @InjectModel(DataStorage.name) private dataStorageModel: Model<DataStorage>
  ) { }

  findOne(filter: FilterQuery<DataStorage>, projection?: ProjectionType<DataStorage>): Promise<DataStorage> {
    return this.dataStorageModel.findOne(filter, projection)
  }

  find(filter: FilterQuery<DataStorage>, projection?: ProjectionType<DataStorage>): Promise<DataStorage[]> {
    return this.dataStorageModel.find(filter, projection)
  }

  create(entity: DataStorage): Promise<DataStorage> {
    return new this.dataStorageModel(entity).save()
  }

  async update(entity: DataStorage): Promise<void> {
    await this.dataStorageModel.updateOne({
      _id: entity._id
    }, entity)
  }

  async remove(entity: DataStorage): Promise<void> {
    await this.dataStorageModel.deleteOne({
      _id: entity._id
    })
  }
}