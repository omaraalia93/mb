import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@app-core/core.module';
import {AuthModule} from '@app-auth/auth.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  AppComponent,
  Error404Component,
  ErrorForbiddenComponent
} from './index';
import { LottieComponent } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent, Error404Component, ErrorForbiddenComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    NgbModule,
    LottieComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
