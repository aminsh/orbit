import {Routes} from '@angular/router'
import {AuthLayoutComponent} from './component/auth-layout.component'
import {LoginComponent} from './component/login.component'
import {RegisterComponent} from './component/register.component'

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]
  }
]
