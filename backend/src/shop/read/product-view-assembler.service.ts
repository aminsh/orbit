import {ProductRepository} from '../repository/product.repository'
import {InventoryInputRepository} from '../repository/inventory-input-repository'
import {ProductView} from '../dto/product.view'
import {Injectable} from '@nestjs/common'
import {userAssembler} from '../../user/dto/user-assembler'
import {Types} from 'mongoose'

@Injectable()
export class ProductViewAssemblerService {
  constructor(
    private productRepository: ProductRepository,
    private inventoryInputRepository: InventoryInputRepository,
  ) {
  }

  async assemble(id: string): Promise<ProductView> {
    const entity = await this.productRepository.findOne({
      _id: id,
    }, {}, {populate: 'createdBy'})

    const view: ProductView = {
      createdBy: userAssembler(entity.createdBy),
      id: entity._id,
      sku: entity.sku,
      title: entity.title,
      description: entity.description,
      quantity: 0,
    }

    await this.assembleQuantity(id, view)

    return view
  }

  private async assembleQuantity(id: string, view: ProductView): Promise<void> {
    const result: { totalQuantity: number }[] = await this.inventoryInputRepository.model.aggregate([
      {
        $match: {
          lines: {
            $elemMatch: {
              product: new Types.ObjectId(id)
            }
          }
        }
      },
      {
        $unwind: {
          path: '$lines'
        },
      },
      {
        $project: {
          product: '$lines.product',
          quantity: "$lines.quantity"
        }
      },
      {
        $unionWith: {
          coll: 'inventoryoutputs',
          pipeline: [
            {
              $unwind: {
                path: '$lines'
              },
            }, {
              $project: {
                product: '$lines.product',
                quantity: {$multiply: ['$lines.quantity', -1]},
              }
            }
          ]
        }
      },
      {
        $match: {
          product: new Types.ObjectId(id)
        }
      },
      {
        $group: {
          _id: null,
          totalQuantity: {$sum: "$quantity"}
        }
      }
    ])

    view.quantity = result?.length ? result[0]?.totalQuantity ?? 0 : 0
  }
}