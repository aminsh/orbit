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
import {DashboardComponent} from "./dashboard.component"
import {GraphQLModule} from './graphql.module'
import {NzButtonModule} from 'ng-zorro-antd/button'
import {NzTypographyModule} from 'ng-zorro-antd/typography'
import {DataModule} from '../data/data.module'

registerLocaleData(en)

@NgModule({
  declarations: [AppComponent, DashboardComponent],
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
    GraphQLModule,
    NzButtonModule,
    NzTypographyModule,
    UserModule,
    DataModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setTranslation('en', enDictionary)
    translateService.setDefaultLang('en')
  }
}
