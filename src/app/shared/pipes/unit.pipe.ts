import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  unit:string = "$";
  constructor() {}

  transform(value: any): string {

    if (value === null || value === undefined) {
      return '';
    }

    if (value === 'unit') {
      return this.unit;
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return value.toString();  
    }

    const formattedNumber = formatNumber(Math.abs(numericValue), 'en', '1.0-100');

    // Format the output based on whether the number is negative
    if (numericValue < 0) {
      return `-${this.unit}${formattedNumber}`;
    } else {
      return `${this.unit}${formattedNumber}`;
    }
  }
}
