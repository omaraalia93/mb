import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserCheckService {
  private _isSafari: boolean;
  private _isChrome: boolean;
  private _isFirefox: boolean;
  private _isEdge: boolean;

  constructor() {
    this._isSafari = this.checkIfSafari();
    this._isChrome = this.checkIfChrome();
    this._isFirefox = this.checkIfFirefox();
    this._isEdge = this.checkIfEdge();
  }

  private checkIfSafari(): boolean {
    return (
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      (navigator.vendor && navigator.vendor.indexOf('Apple') > -1)
    );
  }

  private checkIfChrome(): boolean {
    return (
      /chrome/i.test(navigator.userAgent) &&
      /google inc/i.test(navigator.vendor)
    );
  }

  private checkIfFirefox(): boolean {
    return /firefox/i.test(navigator.userAgent);
  }

  private checkIfEdge(): boolean {
    return (
      /edg/i.test(navigator.userAgent) &&
      /chrome/i.test(navigator.userAgent) &&
      /google inc/i.test(navigator.vendor)
    );
  }

  get isSafari(): boolean {
    return this._isSafari;
  }

  get isChrome(): boolean {
    return this._isChrome;
  }

  get isFirefox(): boolean {
    return this._isFirefox;
  }

  get isEdge(): boolean {
    return this._isEdge;
  }
}
