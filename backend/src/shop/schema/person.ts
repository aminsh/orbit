import { Entity } from '../../shared/type'
import { User } from '../../user/shema/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({ timestamps: true })
export class Person extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User

  @Prop()
  isCustomer: boolean

  @Prop()
  isSupplier: boolean

  @Prop()
  title: string
}

export const PersonSchema = SchemaFactory.createForClass(Person)