import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { Person } from '../schema/person'
import { Repository } from '../../shared/type'

@Injectable()
export class PersonRepository implements Repository<Person> {
  constructor(
    @InjectModel(Person.name) private model: Model<Person>,
  ) {
  }

  findOne(filter: FilterQuery<Person>, projection?: ProjectionType<Person>, options?: QueryOptions<Person>): Promise<Person> {
    return this.model.findOne(filter, projection, options)
  }

  find(filter: FilterQuery<Person>, projection?: ProjectionType<Person>, options?: QueryOptions<Person>): Promise<Person[]> {
    return this.model.find(filter, projection, options)
  }

  create(entity: Person): Promise<Person> {
    const data = new this.model(entity)
    return data.save()
  }

  async update(entity: Person): Promise<void> {
    await this.model.updateOne({
      _id: entity._id,
    }, entity)
  }

  async remove(entity: Person): Promise<void> {
    await this.model.deleteOne({ _id: entity._id })
  }
}