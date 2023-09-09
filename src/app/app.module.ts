import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgxsModule } from '@ngxs/store'
import { DataState } from './modules/people/data.state'
import { HttpClientModule } from '@angular/common/http'
import { PeopleListComponent } from './pages/people-list/people-list.component'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [AppComponent],
  imports: [
    PeopleListComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NgxsModule.forRoot([DataState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
