import { Component, Input } from '@angular/core'
import { TableCellComponent } from '../../../../data/data.type'

@Component({
  template: `
    <span [hidden]="!value" nz-icon nzType="check" nzTheme="outline"></span>
  `
})
export class BooleanCellComponent implements TableCellComponent{
    @Input() value: any
}
