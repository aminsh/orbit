import { Entity } from '../../shared/type'
import { Person } from './person'
import { OrderLine, OrderLineSchema } from './order-line'
import { User } from '../../user/shema/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({timestamps: true})
export class Order extends Entity {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  createdBy: User

  @Prop()
  number: number

  @Prop()
  date: Date

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Person.name})
  customer: Person

  @Prop([{type: OrderLineSchema}])
  lines: OrderLine[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)