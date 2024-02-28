import { Dictionary } from '../../../core/type'
import { Type } from '@angular/core'
import { DataModelFieldType, EditorComponent, TableCellComponent } from '../../../data/data.type'
import { TextCellComponent } from './table-cell-component/text-cell.component'
import { TextFieldComponent } from './editor-component/text-field.component'
import { IntegerFieldComponent } from './editor-component/integer-field.component'
import { BooleanFieldComponent } from './editor-component/boolean-field.component'
import { FloatFieldComponent } from './editor-component/float-field.component'
import { BooleanCellComponent } from './table-cell-component/boolean-cell.component'

export const fieldComponentMapper: Dictionary<{editor: Type<EditorComponent>, tableCell: Type<TableCellComponent>}> = {
  [DataModelFieldType.Text]: {
    editor: TextFieldComponent,
    tableCell: TextCellComponent,
  },
  [DataModelFieldType.Integer]: {
    editor: IntegerFieldComponent,
    tableCell: TextCellComponent,
  },
  [DataModelFieldType.Boolean]: {
    editor: BooleanFieldComponent,
    tableCell: BooleanCellComponent,
  },
  [DataModelFieldType.Float]: {
    editor: FloatFieldComponent,
    tableCell: TextCellComponent,
  },
}
