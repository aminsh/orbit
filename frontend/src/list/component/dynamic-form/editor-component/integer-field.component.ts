import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DataModelField, EditorComponent } from '../../../../data/data.type'

@Component({
  template: `
    <form [formGroup]="form" nz-form nzLayout="vertical">
      <nz-form-item>
        <nz-form-label>{{field.label}}</nz-form-label>
        <nz-form-control>
          <input type="number" nz-input [formControlName]="field.name"/>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
})
export class IntegerFieldComponent implements EditorComponent {
  @Input() form!: FormGroup
  @Input() field!: DataModelField
}
