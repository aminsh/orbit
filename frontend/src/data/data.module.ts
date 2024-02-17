import {NgModule} from '@angular/core'
import {DataStorageComponent} from './component/data-storage.component'
import {DataLayoutComponent} from './component/data-layout.component'
import {RouterModule, RouterOutlet} from '@angular/router'
import {routes} from './data.routes'
import {TranslateModule} from '@ngx-translate/core'
import {NzIconModule} from 'ng-zorro-antd/icon'
import {NzButtonModule} from 'ng-zorro-antd/button'
import {DataStorageEntryComponent} from './component/data-storage-entry.component'
import {NzModalModule} from 'ng-zorro-antd/modal'
import {ReactiveFormsModule} from '@angular/forms'
import {NgForOf, NgIf} from '@angular/common'
import {NzAlertModule} from 'ng-zorro-antd/alert'
import {NzFormModule} from 'ng-zorro-antd/form'
import {NzGridModule} from 'ng-zorro-antd/grid'
import {NzInputModule} from 'ng-zorro-antd/input'
import {NzSelectModule} from 'ng-zorro-antd/select'
import {NzTableModule} from 'ng-zorro-antd/table'
import {DataModelEntryComponent} from './component/data-model-entry.component'

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
  ],
  providers: [],
  declarations: [
    DataLayoutComponent,
    DataStorageComponent,
    DataStorageEntryComponent,
    DataModelEntryComponent,
  ]
})
export class DataModule {}
