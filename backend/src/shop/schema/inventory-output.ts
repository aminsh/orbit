import { Entity } from '../../shared/type'
import { InventoryType } from './enums'
import { Person } from './person'
import { InventoryLine, InventoryLineSchema } from './inventory-line'
import { User } from '../../user/shema/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({timestamps: true})
export class InventoryOutput extends Entity {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  createdBy: User

  @Prop()
  number: number

  @Prop()
  date: Date

  @Prop({enum: Object.values(InventoryType)})
  type: InventoryType

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Person.name})
  supplier: Person

  @Prop([{type: InventoryLineSchema}])
  lines: InventoryLine[]
}

export const InventoryOutputSchema = SchemaFactory.createForClass(InventoryOutput)