import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { mockPrices, stockSymbols } from '../models/dashboard.model';
import { RestService } from '@app-core/index';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class DashboardService {
  constructor(private restService: RestService) {}

  startStockPriceUpdates(): Observable<any> {
    return timer(0, 2000).pipe(map(() => this.generateRandomStockPrices()));
  }

  getRealTimeStockData(symbols:string[]): Observable<any> {
    return timer(0, 2000).pipe(
      switchMap(() => this.fetchStockData(symbols)) 
    );
  }

  private generateRandomStockPrices() {
    return stockSymbols.map((symbol) => {
      const randomFluctuation = (Math.random() * 225 - 225).toFixed(2);
      const currentPrice = (
        mockPrices[symbol].currentPrice + parseFloat(randomFluctuation)
      ).toFixed(2);
      return {
        symbol,
        price: parseFloat(currentPrice),
        name: mockPrices[symbol].name,
        dailyHigh: mockPrices[symbol].dailyHigh,
        dailyLow: mockPrices[symbol].dailyLow,
        week52High: mockPrices[symbol].week52High,
        week52Low: mockPrices[symbol].week52Low,
      };
    });
  }

  private fetchStockData(stockSymbol: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Success-Toaster-Disabled': 'true',
      'x-rapidapi-host': environment.rapidHost,
      'x-rapidapi-key': environment.rapidApiKey,
    });

    const params:any = {'symbol':stockSymbol.join(',')};

    return this.restService.request<any, any>({
      method: 'GET',
      url: `${environment.rapidUrl}/symbol/composite`,
      headers,
      params
    });
  }
}
