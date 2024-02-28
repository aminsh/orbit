import { Component, OnInit } from '@angular/core'
import { DataModalService } from '../../data/service/data-modal.service'
import { DataModel } from '../../data/data.type'

@Component({
  selector: 'list-menu',
  template: `
    <li nz-submenu nzOpen nzTitle="{{'list'|translate}}" nzIcon="unordered-list">
      <ul>
        <li *ngFor="let model of dataModels"
            nz-menu-item
            nzMatchRouter>
          <a [routerLink]="['/list/of', model.id]">{{ model.name }}</a>
        </li>
      </ul>
    </li>
  `,
})
export class ListMenuComponent implements OnInit {
  constructor(
    private dataModelService: DataModalService,
  ) {
  }

  dataModels!: DataModel[]

  ngOnInit() {
    this.dataModelService.find({take: 10, skip: 0})
      .subscribe(result => this.dataModels = result.data)
  }
}
