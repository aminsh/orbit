import { NgModule } from '@angular/core'
import { FormHostDirective } from './component/dynamic-form/form-host.directive'
import { FormContainerComponent } from './component/dynamic-form/form-container.component'
import { FieldErrorDisplayComponent } from './component/dynamic-form/field-error-display.component'
import { ListComponent } from './component/list.component'
import { TranslatePipe } from '../core/service/translate/translate.pipe'
import { ReactiveFormsModule } from '@angular/forms'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzInputModule } from 'ng-zorro-antd/input'
import { DataModule } from '../data/data.module'
import { NgForOf, NgIf } from '@angular/common'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzWaveModule } from 'ng-zorro-antd/core/wave'
import { RouterModule } from '@angular/router'
import { routes } from './list.routes'
import { ListMenuComponent } from './component/list.menu.component'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { TableCellHostDirective } from './component/dynamic-form/table-cell-host.directive'
import { TextFieldComponent } from './component/dynamic-form/editor-component/text-field.component'
import { IntegerFieldComponent } from './component/dynamic-form/editor-component/integer-field.component'
import { BooleanFieldComponent } from './component/dynamic-form/editor-component/boolean-field.component'
import { FloatFieldComponent } from './component/dynamic-form/editor-component/float-field.component'
import { ListEntryComponent } from './component/list-entry.component'
import { TextCellComponent } from './component/dynamic-form/table-cell-component/text-cell.component'
import { BooleanCellComponent } from './component/dynamic-form/table-cell-component/boolean-cell.component'

@NgModule({
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    DataModule,
    NgForOf,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzToolTipModule,
    NzWaveModule,
    RouterModule.forChild(routes),
    NzMenuModule,
    NgIf,
  ],
  providers: [],
  declarations: [
    FormHostDirective,
    TableCellHostDirective,
    FormContainerComponent,
    FieldErrorDisplayComponent,
    TextFieldComponent,
    IntegerFieldComponent,
    BooleanFieldComponent,
    FloatFieldComponent,

    TextCellComponent,
    BooleanCellComponent,

    ListEntryComponent,
    ListComponent,
    ListMenuComponent,
  ],
  exports: [
    ListMenuComponent,
  ]
})
export class ListModule {}
