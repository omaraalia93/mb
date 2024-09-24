import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '@app-main/dashboard/models/dashboard.model';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
  @Input() stock:Stock;
  @Output() isChecked:EventEmitter<string> = new EventEmitter<string>();

  checkChange(isChecked: boolean):void {
    this.isChecked.emit(this.stock.symbol);
  }
}
