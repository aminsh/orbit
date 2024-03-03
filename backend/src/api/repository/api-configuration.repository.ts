import { Injectable } from '@nestjs/common'
import { Repository } from '../../shared/type'
import { ApiConfiguration } from '../schema/api-configuration'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class ApiConfigurationRepository implements Repository<ApiConfiguration> {
  constructor(
    @InjectModel(ApiConfiguration.name) private apiConfiguration: Model<ApiConfiguration>,
  ) {
  }

  findOne(
    filter: FilterQuery<ApiConfiguration>,
    projection?: ProjectionType<ApiConfiguration>,
    options?: QueryOptions<ApiConfiguration>,
  ): Promise<ApiConfiguration> {
    return this.apiConfiguration.findOne(filter, projection, options)
  }

  find(
    filter: FilterQuery<ApiConfiguration>,
    projection?: ProjectionType<ApiConfiguration>,
    options?: QueryOptions<ApiConfiguration>,
  ): Promise<ApiConfiguration[]> {
    return this.apiConfiguration.find(filter, projection, options)
  }

  create(entity: ApiConfiguration): Promise<ApiConfiguration> {
    const data = new this.apiConfiguration(entity)
    return data.save()
  }

  update(entity: ApiConfiguration): Promise<any> {
    return this.apiConfiguration.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: ApiConfiguration): Promise<void> {
    await this.apiConfiguration.deleteOne({ _id: entity._id })
  }
}