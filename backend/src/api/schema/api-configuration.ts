import { Entity } from '../../shared/type'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { User } from '../../user/shema/user'
import { DataModel } from '../../data/schema/data-model'
import { ApiConfigurationEndpoint, ApiConfigurationEndpointSchema } from './api-configuration-endpoint'

@Schema({timestamps: true})
export class ApiConfiguration extends Entity {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  createdBy: User

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: DataModel.name})
  dataModal: DataModel

  @Prop()
  prefix: string

  @Prop([{type: ApiConfigurationEndpointSchema}])
  endpoints: ApiConfigurationEndpoint[]
}

export const ApiConfigurationSchema = SchemaFactory.createForClass(ApiConfiguration)