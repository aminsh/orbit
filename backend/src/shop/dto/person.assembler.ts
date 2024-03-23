import {Person} from '../schema/person'
import {PersonView} from './person.view'
import {userAssembler} from '../../user/dto/user-assembler'

export const assemblePerson = (entity: Person): PersonView => ({
  createdBy: userAssembler(entity.createdBy),
  id: entity._id,
  isCustomer: entity.isCustomer,
  isSupplier: entity.isSupplier,
  title: entity.title,
})