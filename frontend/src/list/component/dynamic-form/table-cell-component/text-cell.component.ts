import { Component, Input } from '@angular/core'
import { TableCellComponent } from '../../../../data/data.type'

@Component({
  template: `
    {{ value }}
  `,
})
export class TextCellComponent implements TableCellComponent {
  @Input() value: any
}
