import { DataModelField } from '../schema/data-model-field'
import { DataModelFieldView } from './data-model-field-view'

export const assembleDataModelField = (entity: Partial<DataModelField>): DataModelFieldView => {
  if (!entity)
    return null

  return {
    name: entity.name,
    label: entity.label,
    type: entity.type,
    required: entity.required,
  }
}