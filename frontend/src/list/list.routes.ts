import { Routes } from '@angular/router'
import { ListLayoutComponent } from './component/list-layout.component'
import { ListComponent } from './component/list.component'
import { AuthGuard } from '../user/service/auth.guard'

export const routes: Routes = [
  {
    path: 'list',
    component: ListLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'of/:modelId',
        component: ListComponent,
      }
    ]
  }
]
