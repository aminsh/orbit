import { Entity } from '../../shared/type'
import { Person } from './person'
import { InventoryLine, InventoryLineSchema } from './inventory-line'
import { User } from '../../user/shema/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({timestamps: true})
export class InventoryInput extends Entity {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  createdBy: User

  @Prop()
  number: number

  @Prop()
  date: Date

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Person.name})
  supplier: Person

  @Prop([{type: InventoryLineSchema}])
  lines: InventoryLine[]
}

export const InventoryInputSchema = SchemaFactory.createForClass(InventoryInput)
