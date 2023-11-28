import mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Entity } from 'src/shared/type'
import { User } from '../../user/shema/user'
import { StorageStatus, StorageType } from './enums'

@Schema({ timestamps: true })
export class DataStorage extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy: User

  @Prop({ enum: Object.values(StorageType) })
  type: StorageType

  @Prop({ enum: Object.values(StorageStatus) })
  status: StorageStatus
}

export const DataStorageSchema = SchemaFactory.createForClass(DataStorage)