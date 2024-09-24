import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '@app-auth/index';
import {LanguageService, NavigationService} from '@app-core/index';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  @Output() clicked = new EventEmitter<any>();

  languages = [];
  defaultLang = "";
  isDarkModeChecked = false;

  confirmLogoutModalOpen = false;
  currentLangIcon: string;

  constructor(
    private authService: AuthService,
    private navigateService: NavigationService,
    private languageService: LanguageService
  ) {
    this.languages = [
      {name: 'English', lang: 'en',icon:'/assets/images/flags/flag-gb.png'},
      {name: 'Maltese', lang: 'mt',icon:'/assets/images/flags/flag-mt.png'}
    ];

    this.defaultLang = this.languages.find(
      (language) => language.lang === this.languageService.getCurrentLanguage()
    ).name;
    this.currentLangIcon  = this.defaultLang === 'English' ? '/assets/images/flags/flag-gb.png' : '/assets/images/flags/flag-mt.png';
  }

  ngOnInit(): void {
  }
 
  handleLanguageSelect(selectedLanguage): void {
    this.defaultLang = selectedLanguage.name;
    this.currentLangIcon  = this.defaultLang === 'English' ? '/assets/images/flags/flag-gb.png' : '/assets/images/flags/flag-mt.png';
    this.languageService.switchLanguage(selectedLanguage.lang);
  }

  trackByLanguage(index: number, language: any): string {
    return language.lang;
  }

  logout(): void {
    this.confirmLogoutModalOpen = true;
  }

  submitConfirmModal(): void {
    this.authService.logout();
    this.confirmLogoutModalOpen = false;
    this.navigateService.navigateToLogin();
  }

  closeConfirmModal(): void {
    this.confirmLogoutModalOpen = false;
  }
}
