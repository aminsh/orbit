import { NgModule } from '@angular/core'
import { DataStorageComponent } from './component/data-storage.component'
import { DataLayoutComponent } from './component/data-layout.component'
import { RouterModule, RouterOutlet } from '@angular/router'
import { routes } from './data.routes'
import { TranslateModule } from '@ngx-translate/core'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { DataStorageEntryComponent } from './component/data-storage-entry.component'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { ReactiveFormsModule } from '@angular/forms'
import { JsonPipe, NgForOf, NgIf } from '@angular/common'
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTableModule } from 'ng-zorro-antd/table'
import { DataModelEntryComponent } from './component/data-model-entry.component'
import { DataModelsComponent } from './component/data-models.component'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzTagModule } from 'ng-zorro-antd/tag'

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterOutlet,
    TranslateModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NgIf,
    NzAlertModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NgForOf,
    NzTableModule,
    NzListModule,
    NzCardModule,
    NzDividerModule,
    NzToolTipModule,
    NzCheckboxModule,
    JsonPipe,
    NzSpinModule,
    NzTagModule,
  ],
  providers: [],
  declarations: [
    DataLayoutComponent,
    DataStorageComponent,
    DataStorageEntryComponent,
    DataModelEntryComponent,
    DataModelsComponent,
  ]
})
export class DataModule {}
