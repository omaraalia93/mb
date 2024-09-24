import { Injectable } from '@angular/core';
import {
  ApiName,
  ApiPrefix,
  LocalStorageService,
  NavigationService,
  RestService,
} from '@app-core/index';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {
  IRefreshTokenResponse,
  ISignInDTO,
  ISignInResponse,
} from '@app-auth/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private restService: RestService
  ) {}
  //#region apis
  signin(data: ISignInDTO): Observable<any> {
    // const headers = new HttpHeaders({ 'Success-Toaster-Disabled': 'true' });
    // return this.restService.request<ISignInDTO, ISignInResponse>({
    //   method: 'POST',
    //   url: `${ApiPrefix.apiSrc}/${ApiName.auth}/signin`,
    //   body: data,
    //   headers: headers,
    // }).pipe(
    //   tap((data) => {
    //     this._onDoLogin(data);
    //   })
    // );

    return of("").pipe(
      tap(() => {
        const test = {
          accessToken: 'test',
          accessRefresh: 'test',
          username: 'test',
          userId: 'test',
        };
        this._onDoLogin(test);
      })
    );
  }

  refreshToken(): Observable<IRefreshTokenResponse | boolean> {
    const headers = new HttpHeaders({
      'Success-Toaster-Disabled': 'true',
      refreshToken: `Bearer ${this.getRefreshJwtToken()}`,
    });
    return this.restService
      .request<any, IRefreshTokenResponse>({
        method: 'POST',
        url: `${ApiPrefix.apiSrc}/${ApiName.auth}/jwt/refresh`,
        headers: headers,
      })
      .pipe(
        tap((data) => {
          this._onDoLoginRefresh(data);
        }),
        catchError((error) => {
          this._handleRefreshTokenError();
          return of(false);
        })
      );
  }

  //#endregion apis

  //#region methods
  private _onDoLogin(data: ISignInResponse) {
    this._cacheData(data);
    this.navigationService.navigateToHome();
  }

  private _cacheData(data: ISignInResponse | IRefreshTokenResponse) {
    this.localStorageService.setItemEcrypted(
      'USER_DATA_TEST',
      JSON.stringify(data) || ''
    );
  }

  private _onDoLoginRefresh(data: IRefreshTokenResponse) {
    this._cacheData(data);
  }
  private _handleRefreshTokenError(): void {}

  getJwtToken() {
    const userData = this._getUserData() || '';
    return userData.accessToken || '';
  }

  getRefreshJwtToken() {
    const userData = this._getUserData() || '';
    return userData.refreshToken || '';
  }

  private _getUserData() {
    return JSON.parse(
      this.localStorageService.getItemDecrypted('USER_DATA_TEST') || '{}'
    );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  logout() {
    this.removeCacheData();
  }

  removeCacheData() {
    this.localStorageService.removeData('USER_DATA_TEST');
  }
  //#endregion methods
}
