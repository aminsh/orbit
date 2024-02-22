import { Dictionary } from '../../../core/type'
import { Type } from '@angular/core'
import { DataModelFieldType, FieldComponent } from '../../data.type'
import { TextFieldComponent } from './field-component/text-field.component'
import { IntegerFieldComponent } from './field-component/integer-field.component'
import { BooleanFieldComponent } from './field-component/boolean-field.component'

export const fieldMapper: Dictionary<Type<FieldComponent>> = {
  [DataModelFieldType.Text]: TextFieldComponent,
  [DataModelFieldType.Integer]: IntegerFieldComponent,
  [DataModelFieldType.Boolean]: BooleanFieldComponent,
}
