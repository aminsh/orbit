import {Routes} from '@angular/router'
import {DataLayoutComponent} from './component/data-layout.component'
import {DataStorageComponent} from './component/data-storage.component'
import {AuthGuard} from '../user/service/auth.guard'

export const routes: Routes = [
  {
    path: 'data',
    component: DataLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'storage',
        component: DataStorageComponent,
      }
    ]
  }
]
