import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _sideMenuSubject: Subject<string>;

  sideMenu$: Observable<string>;

  constructor() {
    this._sideMenuSubject = new Subject();

    this.sideMenu$ = this._sideMenuSubject.asObservable();
  }

  closeSideMenu() {
    this._sideMenuSubject.next('close');
  }

  openSideMenu() {
    this._sideMenuSubject.next('open');
  }

  toggleSideMenu() {
    this._sideMenuSubject.next('toggle');
  }
}