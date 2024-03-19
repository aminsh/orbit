import {RequestContext} from '../../shared/service/request-context'
import {PersonRepository} from '../repository/person.repository'
import {Injectable, NotFoundException, Scope} from '@nestjs/common'
import {PersonDto} from '../dto/person.dto'
import {Identity} from '../../shared/type'
import {Person} from '../schema/person'
import {User} from '../../user/shema/user'

@Injectable({scope: Scope.REQUEST})
export class PersonService {
  constructor(
    private requestContext: RequestContext,
    private personRepository: PersonRepository,
  ) {
  }

  async create(dto: PersonDto): Promise<Identity> {
    const entity = new Person()
    entity.createdBy = {_id: this.requestContext.authenticatedUser.id} as User
    entity.isCustomer = dto.isCustomer
    entity.isSupplier = dto.isSupplier
    entity.title = dto.title

    const result = await this.personRepository.create(entity)

    return {id: result._id}
  }

  async update(id: string, dto: PersonDto): Promise<void> {
    const entity = await this.fetchOrThrow(id)

    entity.title = dto.title

    await this.personRepository.update(entity)
  }

  async remove(id: string): Promise<void> {
    const entity = await this.fetchOrThrow(id)
    await this.personRepository.remove(entity)
  }

  private async fetchOrThrow(id: string): Promise<Person> {
    const entity = await this.personRepository.findOne({
      _id: id,
    })

    if (!entity)
      throw new NotFoundException()

    return entity
  }
}