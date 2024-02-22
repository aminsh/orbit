import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormHostDirective } from './form-host.directive'
import { DataModel, FieldComponent } from '../../data.type'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Enumerable from 'linq'
import { fieldMapper } from './field-mapper'

@Component({
  selector: 'form-container',
  template: `
    <div formHost
         [formGroup]="form"
         nz-form
         nzLayout="vertical">
    </div>
  `,
})
export class FormContainerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
  ) {
  }

  @ViewChild(FormHostDirective, {static: true}) formHost!: FormHostDirective
  @Input() dataModel!: DataModel

  form!: FormGroup

  ngOnInit() {
    const formControls = Enumerable.from(this.dataModel.fields)
      .toObject(
        f => f.name,
        f => {
          const value: any[] = [null]
          if (f.required)
            value.push(Validators.required)
          return value
        })

    this.form = this.fb.group(formControls)

    this.dataModel.fields.forEach(field => {
      const componentType = fieldMapper[field.type]

      if(!componentType)
        return

      const component = this.formHost.createMyComponent<FieldComponent>(componentType)
      component.instance.form = this.form
      component.instance.field = field
    })
  }
}
