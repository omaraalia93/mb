import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class UrlPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!request.url.includes('/assets/i18n/')) {

      let modifiedRequest = request.clone({
          url: `${environment.baseUrl}/${request.url}`,
       });

      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}

export const urlPrefixInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlPrefixInterceptor,
  multi: true,
};
