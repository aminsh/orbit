import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {PersonService} from '../service/person.service'
import {IdentityResponse} from '../../shared/type'
import {PersonDto} from '../dto/person.dto'
import {UseGuards} from '@nestjs/common'
import {JwtGqlAuthenticationGuard} from 'dx-nest-core/auth'
import {VoidResolver} from 'graphql-scalars'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver()
export class PersonResolver {
  constructor(
    private personService: PersonService,
  ) {
  }

  @Mutation(() => IdentityResponse, {name: 'personCreate', nullable: true})
  create(
    @Args('dto', {type: () => PersonDto}) dto: PersonDto,
  ): Promise<IdentityResponse> {
    return this.personService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'personUpdate', nullable: true})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => PersonDto}) dto: PersonDto,
  ) {
    return this.personService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'personRemove', nullable: true})
  remove(
    @Args('id', {type: () => String}) id: string,
  ) {
    return this.personService.remove(id)
  }
}