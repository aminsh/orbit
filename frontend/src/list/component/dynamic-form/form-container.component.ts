import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormHostDirective } from './form-host.directive'
import { DataModel, EditorComponent } from '../../../data/data.type'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Enumerable from 'linq'
import { fieldComponentMapper } from './field-component-mapper'

@Component({
  selector: 'form-container',
  template: `
    <div formHost
         [formGroup]="form"
         nz-form
         nzLayout="vertical">
    </div>
    <ng-template #errorTemplate let-control>
      <div *ngIf="control.errors?.['required']">{{ 'required_error_message'| translate }}</div>
    </ng-template>
  `,
})
export class FormContainerComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
  ) {
  }

  @ViewChild(FormHostDirective, {static: true}) formHost!: FormHostDirective
  @ViewChild('errorTemplate', {read: TemplateRef}) errorTemplate!: TemplateRef<any>
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
      const componentType = fieldComponentMapper[field.type]

      if (!componentType)
        return

      const component = this.formHost.createComponent<EditorComponent>(componentType.editor)
      component.instance.form = this.form
      component.instance.field = field
    })
  }

  ngAfterViewInit(): void {
    this.formHost.components.forEach(cp => cp.instance.errorTemplate = this.errorTemplate)
  }

  setValue(data: any) {
    const value: any = {}
    this.dataModel.fields.forEach(field => {
      value[field.name] = data[field.name]
    })
    this.form.setValue(value)
  }
}
