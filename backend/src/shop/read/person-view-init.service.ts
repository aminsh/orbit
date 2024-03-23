import {PersonViewSyncService} from './person-view-sync.service'
import {Injectable, OnModuleInit} from '@nestjs/common'
import {SearchService} from '../../shared/service/search.service'
import {PersonView} from '../dto/person.view'

@Injectable()
export class PersonViewInitService implements OnModuleInit {
  constructor(
    private personViewSync: PersonViewSyncService,
    private search: SearchService,
  ) {
  }

  async onModuleInit() {
    await this.search.createIndex(PersonView)
    await this.search.putMapping(PersonView)
    await this.personViewSync.syncAll()
  }
}