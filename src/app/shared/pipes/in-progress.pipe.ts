import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inProgress',
})
export class InProgressPipe implements PipeTransform {
  transform(value: string, inProgress: boolean): string {
    return inProgress ? 'general.processing' : value;
  }
}
