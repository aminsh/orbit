import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core'
import { DataModelField, TableCellComponent } from '../../../data/data.type'
import { fieldComponentMapper } from './field-component-mapper'

@Directive({
  selector: '[tableCellHost]',
})
export class TableCellHostDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {
  }

  @Input() set field(value: DataModelField) {
    this.createComponent(value)
  }

  @Input() set value(value: any) {
    this.component.instance.value = value
  }

  private component!: ComponentRef<TableCellComponent>

  createComponent(field: DataModelField) {
    const {tableCell} = fieldComponentMapper[field.type]
    this.component = this.viewContainerRef.createComponent<TableCellComponent>(tableCell)
  }
}
