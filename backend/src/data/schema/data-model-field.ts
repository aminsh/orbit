import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { DataModelFieldType } from './enums'

@Schema({ _id: false })
export class DataModelField {
  @Prop()
  name: string

  @Prop()
  label: string

  @Prop({ type: String, enum: Object.values(DataModelFieldType) })
  type: DataModelFieldType

  @Prop()
  required: boolean
}

export const DataModelFieldSchema = SchemaFactory.createForClass(DataModelField)
