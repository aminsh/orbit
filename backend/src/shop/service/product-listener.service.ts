import {Injectable} from '@nestjs/common'
import {OnEvent} from '@nestjs/event-emitter'
import {SHOP_EVENT} from '../shop.contants'
import {SearchService} from '../../shared/service/search.service'
import {ProductView} from '../dto/product.view'
import {Identity} from '../../shared/type'
import {ProductViewAssemblerService} from '../read/product-view-assembler.service'

@Injectable()
export class ProductListenerService {
  constructor(
    private productViewAssembler: ProductViewAssemblerService,
    private search: SearchService,
  ) {
  }

  @OnEvent(SHOP_EVENT.PRODUCT_CREATED)
  @OnEvent(SHOP_EVENT.PRODUCT_UPDATED)
  @OnEvent(SHOP_EVENT.PRODUCT_INVENTORY_CHANGED)
  async onProductCreatedOrUpdated({id}: Identity) {
    const view = await this.productViewAssembler.assemble(id)
    await this.search.index(ProductView, view)
  }

  @OnEvent(SHOP_EVENT.PRODUCT_REMOVED)
  onProductRemoved({id}: Identity) {
    return this.search.delete(ProductView, id)
  }
}