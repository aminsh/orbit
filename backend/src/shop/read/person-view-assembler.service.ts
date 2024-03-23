import {InjectModel} from '@nestjs/mongoose'
import {Person} from '../schema/person'
import {Model} from 'mongoose'
import {PersonView} from '../dto/person.view'
import {userAssembler} from '../../user/dto/user-assembler'
import {Injectable} from '@nestjs/common'

@Injectable()
export class PersonViewAssemblerService {
  constructor(
    @InjectModel(Person.name) private model: Model<Person>,
  ) {
  }

  async assemble(id: string): Promise<PersonView> {
    const entity = await this.model.findOne({
      _id: id,
    }, {}, {populate: 'createdBy'})

    return {
      createdBy: userAssembler(entity.createdBy),
      id: entity._id,
      isCustomer: entity.isCustomer,
      isSupplier: entity.isSupplier,
      title: entity.title,
    }
  }
}
