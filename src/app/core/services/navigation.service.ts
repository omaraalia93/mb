import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavigationRoute } from '@app-core/index';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  //#region main
  navigateToMain(extras?: NavigationExtras): Promise<boolean> {
    return this._navigate([NavigationRoute.main], true, extras);
  }
  //#endregion main

  //#region home
  navigateToHome(extras?: NavigationExtras): Promise<boolean> {
    return this._navigate(
      [NavigationRoute.main, NavigationRoute.dashboard],
      true,
      extras
    );
  }
  //#endregion home

  //#region auth
  navigateToLogin(extras?: NavigationExtras): Promise<boolean> {
    return this._navigate(
      [NavigationRoute.auth, NavigationRoute.login],
      true,
      extras
    );
  }
  //#endregion auth

  private _navigate(
    commands: any[],
    withSpinner = true,
    extras?: NavigationExtras
  ): Promise<boolean> {
    console.log('Navigating to: ' + commands);
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.router
          .navigate(commands, extras)
          .then((result) => {
            resolve(result);
          })
          .catch((reason) => {
            console.error('Failed to naviagte: ' + commands + ', error:');
            console.error(reason);
            resolve(false);
          })
          .then(() => {
            if (withSpinner) {
            }
          });
      }, 1);
    });
  }
}
