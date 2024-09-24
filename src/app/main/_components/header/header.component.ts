import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService, NavigationService, UiService} from '@app-core/index';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {urlToTitleMap} from './url-to-title-map.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  configLogoutAlert: { [key: string]: any } = {};
  pageTitle: string;
  @Output() toggleMenu: EventEmitter<any>;
  urlToTitleMap: { [key: string]: string };
  homeTitleSet: boolean;

  profileId: number;
  isStaff: any = false;

  constructor(
    private router: Router
  ) {
    this.toggleMenu = new EventEmitter<any>();
    this.urlToTitleMap = urlToTitleMap;
    this._setPageTitle();
  }

  private _setPageTitle(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        const foundPath = Object.keys(urlToTitleMap).find(path => event.url.lastIndexOf(path) > 0);
        this.pageTitle = urlToTitleMap[foundPath];
    });
  }

  ngOnInit(): void {
  }

  toggleButton(): void {
    this.toggleMenu.emit();
  }
}
