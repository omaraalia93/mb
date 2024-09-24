import {Direction} from '@angular/cdk/bidi';
import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {menuItems} from '../../menu-items';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {NavigationService} from '@app-core/index';

interface MenuItem {
  itemName: string;
  route?: string | undefined;
  icon?: string | undefined;
  children?: MenuItem[];
  isActive?: boolean;
  enabled: boolean
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  dir: Direction;
  menuItems: MenuItem[] = [];
  isMobile: boolean;
  isCollapsed: boolean;
  currentRoute: string;
  openedExpansionPanelId: number;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private renderer: Renderer2,
    private navigationService: NavigationService,
    private translateService: TranslateService) {
    this.menuItems = menuItems;
    this.isMobile = false;
    this.isCollapsed = true;
  }

  ngOnInit(): void {
    this._setDirection();
    this._observeScreenMobile();
    this._updateMenuItemActiveState();
    this._resetScrollSideNav();
  }

  private _setDirection(): void {
    let lang = this.translateService.getDefaultLang();
    this.dir = lang === "en" ? "ltr" : "rtl";

    this.translateService.onLangChange.subscribe(langEvent => {
      this.dir = langEvent.lang === "en" ? "ltr" : "rtl";
    });
  }

  private _observeScreenMobile(): void {
    this.observer.observe(['(max-width: 992px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  private _resetScrollSideNav(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        setTimeout(() => {
          let sideNavContent = document.querySelector('.mat-sidenav-content');
          if (sideNavContent) {
            this.renderer.setProperty(sideNavContent, "scrollTop", 0);
          }
        }, 0);
      });
  }

  private _updateMenuItemActiveState(): void {
    this.updateActiveStates();
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.updateActiveStates();
      }
    });
  }

  updateActiveStates() {
    this.currentRoute = this.router.url;
    this.menuItems.forEach(menuItem => {
      menuItem.isActive = this.isAnyChildActive(menuItem.children);
    });
  }

  isAnyChildActive(children: MenuItem[]): boolean {
    if (!children) {
      return false;
    }
    return children.some(child => {
      return this.currentRoute.includes(child.route)
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  openMenu() {
    this.sidenav.open();
    this.isCollapsed = false;
  }

  onDestroy(): void {
    this.translateService.onLangChange.unsubscribe();
  }

  openExpansionPanel(data) {
    this.openedExpansionPanelId = data;
  }

  logoClick(): void {
    this.navigationService.navigateToHome();
  }
}
