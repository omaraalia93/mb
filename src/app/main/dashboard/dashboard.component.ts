import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Stock } from './models/dashboard.model';
import { Subscription } from 'rxjs';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit, OnDestroy  {
  private symbols = ['AAPL','GOOGL','MSFT','TSLA'];
  stockData: Stock[] = [];
  stockSubscription: Subscription | null = null;
  isLoading:boolean = false;

  //mock stocks
  mockStocks: Stock[] = [
    { symbol: 'AAPL', price: 0, enabled: true, name: 'Apple Inc.', dailyHigh: 0, dailyLow: 0, week52High: 0, week52Low: 0 },
    { symbol: 'GOOG', price: 0, enabled: true, name: 'Alphabet Inc.', dailyHigh: 0, dailyLow: 0, week52High: 0, week52Low: 0 },
    { symbol: 'MSFT', price: 0, enabled: false, name: 'Microsoft Corporation', dailyHigh: 0, dailyLow: 0, week52High: 0, week52Low: 0 },
    { symbol: 'TSLA', price: 0, enabled: true, name: 'Tesla Inc.', dailyHigh: 0, dailyLow: 0, week52High: 0, week52Low: 0 },
  ];
  
  private _stockPriceSubscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchMockStockPrices();
    // this.fetchYahooStockPrices();
  }

  fetchMockStockPrices(): void {
    this._stockPriceSubscription = this.dashboardService.startStockPriceUpdates().subscribe((prices) => {
      prices.forEach((priceUpdate: any) => {
        const stock = this.mockStocks.find(s => s.symbol === priceUpdate.symbol);
        if (stock && stock.enabled) {
          stock.price = priceUpdate.price;
          stock.dailyHigh = priceUpdate.dailyHigh;
          stock.dailyLow = priceUpdate.dailyLow;
          stock.name = priceUpdate.name;
          stock.week52High = priceUpdate.week52High;
          stock.week52Low = priceUpdate.week52Low;
        }
      });
    });
  }

  fetchYahooStockPrices():void {
    this.stockSubscription = this.dashboardService.getRealTimeStockData(this.symbols)
    .subscribe({
      next:(res) => { 
          this.stockData = this.symbols.map(symbol => {
          const stockDataItem = res.data.find((item: any) => item.symbol === symbol);
          return {
            symbol: symbol,
            price: stockDataItem ? stockDataItem.price || 0 : 0,
            enabled: true, // or false based on your requirements
            name: stockDataItem ? stockDataItem.name || symbol : symbol,
            dailyHigh: stockDataItem ? stockDataItem.dailyHigh || 0 : 0,
            dailyLow: stockDataItem ? stockDataItem.dailyLow || 0 : 0,
            week52High: stockDataItem ? stockDataItem.week52High || 0 : 0,
            week52Low: stockDataItem ? stockDataItem.week52Low || 0 : 0,
          };
        });
      }
    })
  }

  toggleStock(stockSymbol: string): void {
    const stock = this.mockStocks.find(s => s.symbol === stockSymbol);
    if (stock) {
      stock.enabled = !stock.enabled;
    }
  }

  ngOnDestroy(): void {
    if (this._stockPriceSubscription) {
      this._stockPriceSubscription.unsubscribe();
    }

    if (this.stockSubscription) {
      this.stockSubscription.unsubscribe();
    }
  }
}

