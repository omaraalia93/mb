export const stockSymbols = ['AAPL', 'GOOG', 'MSFT', 'TSLA'];


export const mockPrices: { [symbol: string]: any } = {
  AAPL: {
    currentPrice: 150.00,
    dailyHigh: 152.00,
    dailyLow: 148.50,
    name: 'Apple Inc.',
    week52High: 182.00,
    week52Low: 135.00
  },
  GOOG: {
    currentPrice: 150.00,
    dailyHigh: 2720.00,
    dailyLow: 2685.00,
    name: 'Alphabet Inc.',
    week52High: 2950.00,
    week52Low: 2450.00
  },
  MSFT: {
    currentPrice: 150.00,
    dailyHigh: 305.00,
    dailyLow: 295.50,
    name: 'Microsoft Corporation',
    week52High: 330.00,
    week52Low: 260.00
  },
  TSLA: {
    currentPrice: 150.00,
    dailyHigh: 920.00,
    dailyLow: 885.00,
    name: 'Tesla Inc.',
    week52High: 950.00,
    week52Low: 700.00
  }
};

export interface Stock {
  symbol: string;
  price: number;
  enabled: boolean;
  name: string;
  dailyHigh: number;
  dailyLow: number;
  week52High: number;
  week52Low: number;
}
