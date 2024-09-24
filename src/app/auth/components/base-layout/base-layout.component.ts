import { Component } from '@angular/core';
import { LanguageService } from '@app-core/index';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseAuthLayout {
  currentYear: number;
  languages: { name: string; lang: string }[];
  defaultLangIndex: number;
  isDarkModeChecked:boolean;
  
  constructor(
    private languageService:LanguageService
  ) {
    this.currentYear = new Date().getFullYear();
    
    this.languages = [
      { name: 'English', lang: 'en' },
      { name: 'Maltese', lang: 'mt' },
    ];

    this.defaultLangIndex = this.languages.findIndex(
      (language) => language.lang === this.languageService.getCurrentLanguage()
    );
  }

    ngOnInit():void {
    }

    //#region change language
    handleLanguageSelect(selectedLanguage) {
      this.languageService.switchLanguage(selectedLanguage.lang);
    }
  
    trackByLanguage(index: number, language: any): string {
      return language.lang;
    }
    //#endregion change language
}
