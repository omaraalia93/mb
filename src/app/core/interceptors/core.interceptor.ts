import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpStatusCode,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, catchError, tap, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {IErrorResponse, NavigationService, PrivateHttpHeader} from '@app-core/index';
import {AuthService} from '@app-auth/index';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  constructor(
    private navigationService:NavigationService,
    private authService: AuthService,
    private toastrs: ToastrService,
    private translate: TranslateService
  ) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const successToasterDisabled = request.headers.get(PrivateHttpHeader.successToasterDisabled);
    const errorToasterDisabled = request.headers.get(PrivateHttpHeader.errorToasterDisabled);

    let modifiedHeaders = request.headers;

    if (successToasterDisabled) {
      modifiedHeaders = modifiedHeaders.delete(PrivateHttpHeader.successToasterDisabled);
    }

    if (errorToasterDisabled) {
      modifiedHeaders = modifiedHeaders.delete(PrivateHttpHeader.errorToasterDisabled);
    }
    const clonedRequest = request.clone({
      headers: modifiedHeaders,
    });

    return next.handle(clonedRequest).pipe(
      tap((event) => {
        if (this._isSuccessfulHttpResponse(event) && !successToasterDisabled) {
          const successMessage = this._getSuccessMessage(clonedRequest);
          if (successMessage) {
            this._showSuccessToast(successMessage);
          }
        }
      }),
      catchError((event) => {
        if (!(event instanceof HttpErrorResponse)) {
          return throwError(() => event);
        }
        if (!errorToasterDisabled) this._handleError(event);
        return throwError(() => event);
      })
    );
  }

  private _handleError(err: HttpErrorResponse) {
    if(err.status === 0) {
      this.authService.logout();
      this.navigationService.navigateToLogin();
    }

    const errorMessage = this._getErrorMessage(err);
    if (!errorMessage) return

    if (!this.authService.isLoggedIn()) {
      this._showErrorToast(errorMessage);
    }

    if (this.authService.isLoggedIn() && (err.status !== 401 && err.status !== 403 )) {
      this._showErrorToast(errorMessage);
    }
  }

  private _isSuccessfulHttpResponse(event: HttpEvent<unknown>): boolean {
    return (
      event.type === HttpEventType.Response &&
      [
        HttpStatusCode.Ok,
        HttpStatusCode.Created,
        HttpStatusCode.NoContent,
      ].includes(event.status)
    );
  }

  private _getSuccessMessage(request: HttpRequest<unknown>): string {
    switch (request.method) {
      case 'PATCH':
      case 'PUT':
        return this.translate.instant('core.successes.updated');
      case 'POST':
        return this.translate.instant('core.successes.operation_accomplished');
      case 'DELETE':
        return this.translate.instant('core.successes.deleted');
      default:
        return '';
    }
  }

  private _showSuccessToast(message: string) {
    this.toastrs.success(message, '', {});
  }

  private _getErrorMessage(err: HttpErrorResponse): string {
    let error: IErrorResponse = err.error;

    if (error?.message?.plainText) {
      return error.message.plainText;
    }

    switch (err.status) {
      case HttpStatusCode.BadRequest:
        return this.translate.instant('core.errors.err400');
      case HttpStatusCode.Unauthorized:
        return this.translate.instant('core.errors.err401');
      case HttpStatusCode.Forbidden:
        return this.translate.instant('core.errors.err403');
      case HttpStatusCode.NotFound:
        return this.translate.instant('core.errors.err404');
      case HttpStatusCode.PreconditionFailed:
        return this.translate.instant('core.errors.err412');
      case HttpStatusCode.InternalServerError:
        return this.translate.instant('core.errors.errUnknown');
      case HttpStatusCode.ServiceUnavailable:
        return this.translate.instant('core.errors.err503');
      case HttpStatusCode.UnprocessableEntity:
        return this.translate.instant('core.errors.err422');
      default:
        return this.translate.instant('core.errors.errUnknown');
    }
  }

  private _showErrorToast(message: string) {
    this.toastrs.error(message, '', {});
  }
}

export const coreInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: CoreInterceptor,
  multi: true,
}
