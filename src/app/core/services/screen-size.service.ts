import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BreakPoints } from '@app-core/index';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  private screenSizeSubject: BehaviorSubject<number>;
  public screenSize$: Observable<number>;
  public isSmallScreen$: Observable<boolean>;
  public isMediumScreen$: Observable<boolean>;
  public isLargeScreen$: Observable<boolean>;
  public isXLargeScreen$: Observable<boolean>;
  public isXXLargeScreen$: Observable<boolean>;

  constructor() {
    this.screenSizeSubject = new BehaviorSubject(window.innerWidth);
    this.screenSize$ = this.screenSizeSubject
      .asObservable()
      .pipe(debounceTime(200));
    this.isSmallScreen$ = this.screenSize$.pipe(
      map((size) => size <= BreakPoints.sm)
    );
    this.isMediumScreen$ = this.screenSize$.pipe(
      map((size) => size <= BreakPoints.md)
    );
    this.isLargeScreen$ = this.screenSize$.pipe(
      map((size) => size <= BreakPoints.lg)
    );
    this.isXLargeScreen$ = this.screenSize$.pipe(
      map((size) => size <= BreakPoints.xl)
    );
    this.isXXLargeScreen$ = this.screenSize$.pipe(
      map((size) => size <= BreakPoints.xxl)
    );
    this.addResizeListener();
  }

  private addResizeListener(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    const screenSize = window.innerWidth;
    if (screenSize != this.screenSizeSubject.value) {
      this.screenSizeSubject.next(screenSize);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
    this.screenSizeSubject.complete();
  }
}
