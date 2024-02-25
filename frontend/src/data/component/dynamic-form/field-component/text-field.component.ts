import {Component, EmbeddedViewRef, Injector, Input, TemplateRef} from '@angular/core'
import {AbstractControl, FormControl, FormGroup} from '@angular/forms'
import { DataModelField, FieldComponent } from '../../../data.type'

@Component({
  template: `
    <form [formGroup]="form" nz-form nzLayout="vertical">
      <nz-form-item>
        <nz-form-label>{{field.label}}</nz-form-label>
        <nz-form-control [nzErrorTip]="errorTemplate">
          <input type="text" nz-input [formControlName]="field.name"/>
        </nz-form-control>
      </nz-form-item>


    </form>
  `,
})
export class TextFieldComponent implements FieldComponent {
  @Input() form!: FormGroup
  @Input() field!: DataModelField
  @Input() errorTemplate!: TemplateRef<any>
}
