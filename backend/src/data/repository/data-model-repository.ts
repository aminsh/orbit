import { Injectable } from '@nestjs/common'
import { Repository } from '../../shared/type'
import { DataModel } from '../schema/data-model'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class DataModelRepository implements Repository<DataModel> {
  constructor(
    @InjectModel(DataModel.name) private dataModel: Model<DataModel>
  ) {}

  find(filter: FilterQuery<DataModel>, projection?: ProjectionType<DataModel>, options?: QueryOptions<DataModel>): Promise<DataModel[]> {
    return this.dataModel.find(filter, projection, options)
  }

  findOne(filter: FilterQuery<DataModel>, projection?: ProjectionType<DataModel>, options?: QueryOptions<DataModel>): Promise<DataModel> {
    return this.dataModel.findOne(filter, projection, options)
  }

  create(entity: DataModel): Promise<DataModel> {
    const data = new this.dataModel(entity)
    return data.save()
  }

  async update(entity: DataModel): Promise<any> {
    return this.dataModel.updateOne({
      _id: entity._id,
    }, entity)
  }
  async remove(entity: DataModel): Promise<void> {
    await this.dataModel.deleteOne({ _id: entity._id })
  }
}
