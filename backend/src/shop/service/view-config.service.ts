import {Injectable, OnModuleInit} from '@nestjs/common'
import {ProductRepository} from '../repository/product.repository'
import {ProductView} from '../dto/product.view'
import {SearchService} from '../../shared/service/search.service'
import {PersonView} from '../dto/person.view'
import {PersonRepository} from '../repository/person.repository'
import {assemblePerson} from '../dto/person.assembler'
import {ProductViewAssemblerService} from '../read/product-view-assembler.service'

@Injectable()
export class ViewConfigService implements OnModuleInit {
  constructor(
    private productRepository: ProductRepository,
    private productViewAssembler: ProductViewAssemblerService,
    private personRepository: PersonRepository,
    private search: SearchService,
  ) {
  }

  onModuleInit() {
    /*return Promise.all([
      this.configureProduct(),
      this.configurePerson(),
    ])*/
  }

  async configureProduct() {
    await this.search.createIndex(ProductView)
    await this.search.putMapping(ProductView)

    const products = await this.productRepository.find({}, {_id: 1})
    const productViews = await Promise.all(
      products.map(({_id}) => this.productViewAssembler.assemble(_id))
    )
    await this.search.bulkIndex(ProductView, productViews)
  }

  async configurePerson() {
    await this.search.createIndex(PersonView)
    await this.search.putMapping(PersonView)

    const people = await this.personRepository.find({}, {}, {
      populate: 'createdBy'
    })

    await this.search.bulkIndex(PersonView, people.map(assemblePerson))
  }
}
