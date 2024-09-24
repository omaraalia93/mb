import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@app-core/index';

@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  constructor(private langaugeService:LanguageService){}

  transform(text: string): string {
    let placeholderText = "";
    if(this.langaugeService.getCurrentLanguage() === "en"){
      placeholderText = `Please enter ${text} here ...`;
    }else {
      placeholderText = `الرجاء ادخال ${text} هنا ...`;
    }
    return placeholderText;
  }
}
