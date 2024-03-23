import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Person, PersonSchema } from './schema/person'
import { Product, ProductSchema } from './schema/product'
import { Order, OrderSchema } from './schema/order'
import { InventoryInput, InventoryInputSchema } from './schema/inventory-input'
import { PersonRepository } from './repository/person.repository'
import { ProductRepository } from './repository/product.repository'
import { InventoryInputRepository } from './repository/inventory-input-repository'
import { OrderRepository } from './repository/order.repository'
import { InventoryOutput, InventoryOutputSchema } from './schema/inventory-output'
import { PersonService } from './service/person.service'
import { ProductService } from './service/product.service'
import { InventoryInputService } from './service/inventory-input.service'
import { InventoryOutputRepository } from './repository/inventory-output-repository'
import { InventoryOutputService } from './service/inventory-output.service'
import { OrderService } from './service/order.service'
import { ProductResolver } from './resolver/product.resolver'
import { PersonResolver } from './resolver/peson.resolver'
import { InventoryInputResolver } from './resolver/inventory-input.resolver'
import { InventoryOutputResolver } from './resolver/inventory-output.resolver'
import { OrderResolver } from './resolver/order.resolver'
import { ProductListenerService } from './service/product-listener.service'
import { ProductViewAssemblerService } from './read/product-view-assembler.service'
import { ProductViewInitService } from './read/product-view-init.service'
import { ProductViewSyncService } from './read/product-view-sync.service'
import { PersonViewInitService } from './read/person-view-init.service'
import { PersonViewSyncService } from './read/person-view-sync.service'
import { PersonViewAssemblerService } from './read/person-view-assembler.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Person.name, schema: PersonSchema},
      {name: Product.name, schema: ProductSchema},
      {name: Order.name, schema: OrderSchema},
      {name: InventoryInput.name, schema: InventoryInputSchema},
      {name: InventoryOutput.name, schema: InventoryOutputSchema},
    ]),
  ],
  providers: [
    PersonRepository,
    PersonService,
    PersonResolver,
    PersonViewInitService,
    PersonViewSyncService,
    PersonViewAssemblerService,
    ProductRepository,
    ProductService,
    ProductResolver,
    ProductViewAssemblerService,
    ProductViewInitService,
    ProductViewSyncService,
    ProductListenerService,
    InventoryInputRepository,
    InventoryInputService,
    InventoryInputResolver,
    InventoryOutputRepository,
    InventoryOutputService,
    InventoryOutputResolver,
    OrderRepository,
    OrderService,
    OrderResolver,
  ],
})
export class ShopModule {
}