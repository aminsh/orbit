import { FormGroup } from '@angular/forms';
import { DataModelField, FieldComponent } from '../../../data.type'
import { Component, Input } from '@angular/core'

@Component({
  template: `
    <form [formGroup]="form" nz-form nzLayout="vertical">
      <label nz-checkbox [formControlName]="field.name">
        <span>{{field.label}}</span>
      </label>
    </form>
  `
})
export class BooleanFieldComponent implements FieldComponent {
  @Input() form!: FormGroup
  @Input() field!: DataModelField
}
