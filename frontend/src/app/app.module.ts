import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IconsProviderModule } from '../core/module/icons-provider.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { UserModule } from "../user/user.module"
import enDictionary from './app.dictionary.en'
import { DashboardComponent } from "./dashboard.component"
import { GraphQLModule } from '../core/module/graphql.module'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { DataModule } from '../data/data.module'
import { DEFAULT_TRANSLATE_DICTIONARY } from '../core/service/translate'
import { TranslatePipe } from '../core/service/translate/translate.pipe'
import { ListModule } from '../list/list.module'

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
    GraphQLModule,
    NzButtonModule,
    NzTypographyModule,
    UserModule,
    DataModule,
    TranslatePipe,
    ListModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: DEFAULT_TRANSLATE_DICTIONARY,
      useValue: enDictionary,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
