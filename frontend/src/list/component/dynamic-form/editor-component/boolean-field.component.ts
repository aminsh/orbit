import { FormGroup } from '@angular/forms';
import { DataModelField, EditorComponent } from '../../../../data/data.type'
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
export class BooleanFieldComponent implements EditorComponent {
  @Input() form!: FormGroup
  @Input() field!: DataModelField
}
