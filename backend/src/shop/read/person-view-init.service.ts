import { PersonViewSyncService } from './person-view-sync.service'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { SearchService } from '../../shared/service/search.service'
import { PersonView } from '../dto/person.view'

@Injectable()
export class PersonViewInitService implements OnModuleInit {
  constructor(
    private personViewSync: PersonViewSyncService,
    private search: SearchService,
  ) {
  }

  async onModuleInit() {
    await this.search.createIndex(PersonView)
    await this.search.putMapping(PersonView, {
      properties: {
        createdBy: {
          properties: {
            id: {type: 'keyword'},
            name: {type: 'wildcard'},
            email: {type: 'keyword'},
          },
        },
        id: {type: 'keyword'},
        isCustomer: {type: 'boolean'},
        isSupplier: {type: 'boolean'},
        title: {type: 'wildcard'},
      }
    })
    await this.personViewSync.syncAll()
  }
}