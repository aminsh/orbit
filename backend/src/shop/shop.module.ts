import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Person, PersonSchema} from './schema/person'
import {Product, ProductSchema} from './schema/product'
import {Order, OrderSchema} from './schema/order'
import {InventoryInput, InventoryInputSchema} from './schema/inventory-input'
import {PersonRepository} from './repository/person.repository'
import {ProductRepository} from './repository/product.repository'
import {InventoryInputRepository} from './repository/inventory-input-repository'
import {OrderRepository} from './repository/order.repository'
import {InventoryOutput, InventoryOutputSchema} from './schema/inventory-output'
import {PersonService} from './service/person.service'
import {ProductService} from './service/product.service'
import {InventoryInputService} from './service/inventory-input.service'
import {InventoryOutputRepository} from './repository/inventory-output-repository'
import {InventoryOutputService} from './service/inventory-output.service'
import {OrderService} from './service/order.service'
import {ProductResolver} from './resolver/product.resolver'
import {PersonResolver} from './resolver/peson.resolver'
import {InventoryInputResolver} from './resolver/inventory-input.resolver'
import {InventoryOutputResolver} from './resolver/inventory-output.resolver'
import {OrderResolver} from './resolver/order.resolver'
import {ViewConfigService} from './service/view-config.service'
import {ProductView} from './dto/product.view'
import {ElasticsearchModule} from '@nestjs/elasticsearch'
import {ConfigService} from '@nestjs/config'
import {ProductListenerService} from './service/product-listener.service'
import {ProductViewAssembler} from './view-assembler/product-view.assembler'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Person.name, schema: PersonSchema},
      {name: Product.name, schema: ProductSchema},
      {name: Order.name, schema: OrderSchema},
      {name: InventoryInput.name, schema: InventoryInputSchema},
      {name: InventoryOutput.name, schema: InventoryOutputSchema},
    ]),
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTIC_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PersonRepository,
    PersonService,
    PersonResolver,
    ProductRepository,
    ProductService,
    ProductResolver,
    ProductViewAssembler,
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
    ViewConfigService,
  ],
})
export class ShopModule {
}