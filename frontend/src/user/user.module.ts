import {NgModule} from "@angular/core"
import {LoginComponent} from "./component/login.component"
import {NzFormModule} from "ng-zorro-antd/form"
import {ReactiveFormsModule} from "@angular/forms"
import {NzInputModule} from "ng-zorro-antd/input"
import {TranslateModule} from "@ngx-translate/core"
import {NzButtonModule} from "ng-zorro-antd/button"
import {NzCheckboxModule} from "ng-zorro-antd/checkbox"
import {AuthLayoutComponent} from "./component/auth-layout.component"
import {RouterModule, RouterOutlet} from "@angular/router"
import {routes} from "./user.routes"
import {RegisterComponent} from "./component/register.component"
import {JsonPipe, NgIf} from '@angular/common';
import {NzAlertModule} from 'ng-zorro-antd/alert'

@NgModule({
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule, TranslateModule,
    NzButtonModule,
    NzCheckboxModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    NgIf,
    JsonPipe,
    NzAlertModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class UserModule {
}
