import { Product } from './product'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({_id: false})
export class InventoryLine {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Product.name})
  product: Product

  @Prop()
  quantity: number
}

export const InventoryLineSchema = SchemaFactory.createForClass(InventoryLine)