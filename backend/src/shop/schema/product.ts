import { Entity } from '../../shared/type'
import { User } from '../../user/shema/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({ timestamps: true })
export class Product extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User

  @Prop()
  sku: string

  @Prop()
  title: string

  @Prop()
  description: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)