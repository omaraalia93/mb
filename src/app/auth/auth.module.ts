import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app-shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import {
  AuthComponent,
  LoginComponent,
  tokenInterceptor,
  BaseAuthLayout
} from '@app-auth/index';

import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    BaseAuthLayout,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatStepperModule,
    MatIconModule
  ],
  providers: [tokenInterceptor],
})
export class AuthModule {}
