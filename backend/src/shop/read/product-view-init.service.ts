import {SearchService} from '../../shared/service/search.service'
import {Injectable, OnModuleInit} from '@nestjs/common'
import {ProductView} from '../dto/product.view'
import {ProductViewSyncService} from './product-view-sync.service'

@Injectable()
export class ProductViewInitService implements OnModuleInit {
  constructor(
    private search: SearchService,
    private productViewSync: ProductViewSyncService,
  ) {
  }

  async onModuleInit() {
    await this.search.createIndex(ProductView)
    await this.search.putMapping(ProductView)
    await this.productViewSync.syncAll()
  }
}