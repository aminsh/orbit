import { SearchService } from '../../shared/service/search.service'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ProductView } from '../dto/product.view'
import { ProductViewSyncService } from './product-view-sync.service'

@Injectable()
export class ProductViewInitService implements OnModuleInit {
  constructor(
    private search: SearchService,
    private productViewSync: ProductViewSyncService,
  ) {
  }

  async onModuleInit() {
    await this.search.createIndex(ProductView)
    await this.search.putMapping(ProductView, {
      properties: {
        createdBy: {
          properties: {
            id: {type: 'keyword'},
            name: {type: 'wildcard'},
            email: {type: 'keyword'},
          },
        },
        id: {type: 'keyword'},
        sku: {type: 'keyword'},
        title: {type: 'wildcard'},
        description: {type: 'text'},
        quantity: {type: 'integer'},
      },
    })
    await this.productViewSync.syncAll()
  }
}