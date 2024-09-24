import { Component, OnInit, Renderer2 } from '@angular/core';
import { LanguageService } from '@app-core/services/language.service';
import { LocalStorageService } from '@app-core/services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private renderer:Renderer2,
    private localStorageService:LocalStorageService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.languageService.loadLanguage();
    
    if(this.localStorageService.getItem("MODE") === "dark"){
      this.renderer.addClass(document.body,"dark-mode");
    } else {
      this.renderer.removeClass(document.body,"dark-mode");
    }
    this._setConsoleLogSignature();
  }

  ngAfterViewInit():void {
    setTimeout(() => {
       this.spinner.hide();
    }, 1000);
  }

  private _setConsoleLogSignature():void {
    console.log(
      `%cWelcome To Real time stock app \n%c© ${new Date().getFullYear()} Calamatta Cuschieri`,
      "font-weight:bold; font-family:sans-serif; font-size: 20px",
      "color: #888; font-size: 16px;"
    );
  }
}
