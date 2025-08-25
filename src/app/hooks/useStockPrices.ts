import { useState, useEffect } from "react";

export function useStockPrice(symbol: string) {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      const res = await fetch(`/api/alpha-candle?symbol=${symbol}`);
      const data = await res.json();
      const series = data["Time Series (Daily)"];
      if (series) {
        const latestDate = Object.keys(series)[0];
        const price = Number(series[latestDate]["4. close"]);
        setCurrentPrice(price);
      } else {
        setCurrentPrice(null);
      }
    }
    fetchPrice();
  }, [symbol]);

  return currentPrice;
}
