import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requiredLbl',
})
export class RequiredLabelPipe implements PipeTransform {
  constructor(){}

  transform(text: string): string {
    return `* ${text}`;
  }
}
