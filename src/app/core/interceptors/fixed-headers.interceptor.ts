import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '@app-core/index';

@Injectable()
export class FixedHeadersInterceptor implements HttpInterceptor {
  constructor(private languageService: LanguageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/assets/i18n/')) return next.handle(request); 
    
    const currentLanguage = this.languageService.getCurrentLanguage();
    const currentLanguageAbbr = currentLanguage === "mt" ? "mt" : "en_uk";
    
    const modifiedRequest = request.clone({
      setHeaders: {
        'Accept-Language': currentLanguageAbbr,
        "Accept":"*/*",
        "Content-type":"application/json"
      },
    });

    return next.handle(modifiedRequest); 
  }
}

export const fixedHeadersInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FixedHeadersInterceptor,
  multi: true,
}