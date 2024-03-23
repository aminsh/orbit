import {Injectable} from '@nestjs/common'
import {Person} from '../schema/person'
import {Model} from 'mongoose'
import {SearchService} from '../../shared/service/search.service'
import {PersonViewAssemblerService} from './person-view-assembler.service'
import {PersonView} from '../dto/person.view'
import {InjectModel} from '@nestjs/mongoose'

@Injectable()
export class PersonViewSyncService {
  constructor(
    @InjectModel(Person.name) private model: Model<Person>,
    private personViewAssembler: PersonViewAssemblerService,
    private search: SearchService,
  ) {
  }

  async syncAll(): Promise<void> {
    const people = await this.model.find({}, {_id: 1})
    const peopleView = await Promise.all(
      people.map(({_id}) => this.personViewAssembler.assemble(_id))
    )
    await this.search.bulkIndex(PersonView, peopleView)
  }
}