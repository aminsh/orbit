import {Product} from '../schema/product'
import {ProductView} from './product.view'
import {userAssembler} from '../../user/dto/user-assembler'

export const assembleProduct = (product: Product): ProductView => ({
  createdBy: userAssembler(product.createdBy),
  id: product._id,
  sku: product.sku,
  title: product.title,
  description: product.description,
  quantity: 0,
})