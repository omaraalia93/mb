import { Component, OnInit, ViewChild} from '@angular/core';
import {SideNavComponent} from './_components/side-nav/side-nav.component';
import {NavigationService} from '@app-core/index';
import {AuthService} from '@app-auth/index';

interface MenuItem {
  itemName: string;
  route?: string | undefined;
  icon?: string | undefined;
  children?: MenuItem[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  selectedRouteName: string;
  @ViewChild(SideNavComponent) sideNav!: SideNavComponent;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit(): void {
    this._pageLoad();
  }

  getSelectedRoute(selectedRoute: string): void {
    this.selectedRouteName = selectedRoute;
  }

  openMenu() {
    this.sideNav.openMenu();
  }

  private _pageLoad(): void {
    if (!this.authService.isLoggedIn()) {
      this.navigationService.navigateToLogin();
    }
  }
}
