import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class CustomLoadingInterceptor implements HttpInterceptor {

  constructor(private loadingBar: LoadingBarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = [
      '/jwt/refresh'
    ];

    const shouldExclude = excludedUrls.some(url => request.url.includes(url));

    if (shouldExclude) {
      return next.handle(request); 
    }

    const ref = this.loadingBar.useRef();
    ref.start();

    return next.handle(request).pipe(
      finalize(() => ref.complete())
    );
  }
}


export const customLoadingInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomLoadingInterceptor,
    multi: true,
  };