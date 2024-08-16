interface PortfolioProfitOptions {
  annualizedReturn: boolean;
}

class Stock {
  private readonly _prices: Record<string, number> = {};

  public price(date: Date): number {
    const key = date.toISOString().split("T")[0]!;
    return this._prices[key] ?? 0;
  }
}

class Portfolio {
  private readonly _stocks: Stock[] = [];

  private _getNumberOfDaysInRange(startDate: Date, endDate: Date): number {
    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return days;
  }

  profit(startDate: Date, endDate: Date, options?: PortfolioProfitOptions) {
    let profit = 0;

    for (const stock of this._stocks) {
      const startPrice = stock.price(startDate);
      const endPrice = stock.price(endDate);

      profit += endPrice - startPrice;
    }

    if (options?.annualizedReturn) {
      const days = this._getNumberOfDaysInRange(startDate, endDate);

      const principal = this._stocks.reduce(
        (total, currentStock) => total + currentStock.price(startDate),
        0
      );
      const total = principal + profit;

      return (total / principal) ** (365 / days) - 1;
    }

    return profit;
  }
}
