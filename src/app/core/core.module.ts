import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EnsureModuleLoadedOnceGuard } from './classes/ensure-module-loaded-once.class';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import {
  fixedHeadersInterceptor,
  urlPrefixInterceptor,
  coreInterceptor,
} from '@app-core/index';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { customLoadingInterceptor } from './interceptors/custom-loading.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      tapToDismiss: true,
      progressBar: false,
      preventDuplicates: true,
    }),
    LoadingBarModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-pulse' }),
    NgScrollbarModule,
    LoadingBarRouterModule
  ],
  exports: [
    NgxSpinnerModule,
    TranslateModule,
    NgScrollbarModule,
    LoadingBarRouterModule
  ],
  providers: [
    customLoadingInterceptor,
    provideLottieOptions({
      player: () => player,
    }),
    urlPrefixInterceptor,
    coreInterceptor,
    fixedHeadersInterceptor
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  const path = './assets/i18n/';
  return new TranslateHttpLoader(http, path, '.json');
}