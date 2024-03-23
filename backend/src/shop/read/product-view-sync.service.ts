import {ProductViewAssemblerService} from './product-view-assembler.service'
import {ProductRepository} from '../repository/product.repository'
import {ProductView} from '../dto/product.view'
import {SearchService} from '../../shared/service/search.service'
import { Injectable } from '@nestjs/common'
import {OnEvent} from '@nestjs/event-emitter'
import {SHOP_EVENT} from '../shop.contants'

@Injectable()
export class ProductViewSyncService {
  constructor(
    private productViewAssembler: ProductViewAssemblerService,
    private productRepository: ProductRepository,
    private search: SearchService,
  ) {
  }

  async syncAll() {
    const products = await this.productRepository.find({}, {_id: 1})

    const productViews = await Promise.all(
      products.map(({_id}) => this.productViewAssembler.assemble(_id))
    )

    await this.search.bulkIndex(ProductView, productViews)
  }

  @OnEvent(SHOP_EVENT.PRODUCT_CREATED)
  @OnEvent(SHOP_EVENT.PRODUCT_UPDATED)
  @OnEvent(SHOP_EVENT.PRODUCT_INVENTORY_CHANGED)
  async onCreatedOrUpdated(id: string) {
    const view = await this.productViewAssembler.assemble(id)
    await this.search.index(ProductView, view)
  }

  @OnEvent(SHOP_EVENT.PRODUCT_REMOVED)
  async onDeleted(id: string) {
    return this.search.delete(ProductView, id)
  }
}