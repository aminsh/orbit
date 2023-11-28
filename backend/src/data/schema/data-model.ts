import mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Entity } from '../../shared/type'
import { DataModelField, DataModelFieldSchema } from './data-model-field'
import { User } from '../../user/shema/user'
import { DataStorage } from './data-storage'

@Schema({ timestamps: true })
export class DataModel extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User

  @Prop()
  name: string

  @Prop([{ type: DataModelFieldSchema }])
  fields: DataModelField[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DataStorage.name })
  dataStorage: DataStorage
}

export const DataModelSchema = SchemaFactory.createForClass(DataModel)
