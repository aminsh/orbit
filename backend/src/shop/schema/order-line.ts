import { Product } from './product'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({_id: false})
export class OrderLine {
  @Prop()
  row: number

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Product.name})
  product: Product

  @Prop()
  quantity: number

  @Prop()
  unitPrice: number
}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine)