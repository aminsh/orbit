import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {ProductService} from '../service/product.service'
import {IdentityResponse, PageableRequest} from '../../shared/type'
import {ProductDto} from '../dto/product.dto'
import {UseGuards} from '@nestjs/common'
import {JwtGqlAuthenticationGuard} from 'dx-nest-core/auth'
import {VoidResolver} from 'graphql-scalars'
import {SearchService} from '../../shared/service/search.service'
import {ProductPageableResponse, ProductView} from '../dto/product.view'

@UseGuards(JwtGqlAuthenticationGuard)
@Resolver()
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private search: SearchService,
  ) {
  }

  @Query(() => ProductPageableResponse, {name: 'productsFind'})
  find(
    @Args('request', {type: () => PageableRequest}) request: PageableRequest,
  ): Promise<ProductPageableResponse> {
    return this.search.get(ProductView, request)
  }

  @Mutation(() => IdentityResponse, {name: 'productCreate', nullable: true})
  create(
    @Args('dto', {type: () => ProductDto}) dto: ProductDto,
  ): Promise<IdentityResponse> {
    return this.productService.create(dto)
  }

  @Mutation(() => VoidResolver, {name: 'productUpdate', nullable: true})
  update(
    @Args('id', {type: () => String}) id: string,
    @Args('dto', {type: () => ProductDto}) dto: ProductDto,
  ) {
    return this.productService.update(id, dto)
  }

  @Mutation(() => VoidResolver, {name: 'productRemove', nullable: true})
  remove(
    @Args('id', {type: () => String}) id: string,
  ) {
    return this.productService.remove(id)
  }
}