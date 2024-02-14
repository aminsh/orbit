import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n'
import {registerLocaleData} from '@angular/common'
import en from '@angular/common/locales/en'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {IconsProviderModule} from './icons-provider.module'
import {NzLayoutModule} from 'ng-zorro-antd/layout'
import {NzMenuModule} from 'ng-zorro-antd/menu'
import {UserModule} from "../user/user.module"
import {TranslateModule, TranslateService} from '@ngx-translate/core'
import enDictionary from './app.dictionary.en'
import {DashboardComponent} from "./dashboard.component";
import {GraphQLModule} from './graphql.module'

registerLocaleData(en)

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    TranslateModule.forRoot(),
    UserModule,
    GraphQLModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    //{provide: HTTP_INTERCEPTORS, useValue: ErrorHandlingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setTranslation('en', enDictionary)
    translateService.setDefaultLang('en')
  }
}
