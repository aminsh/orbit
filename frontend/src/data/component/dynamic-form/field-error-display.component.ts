import {Component, Input} from '@angular/core'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'field-error-display',
  template: `
    <div *ngIf="control.errors?.['required']">{{ 'required_error_message'| translate }}</div>
  `
})
export class FieldErrorDisplayComponent {
  @Input() control!: FormControl
}
