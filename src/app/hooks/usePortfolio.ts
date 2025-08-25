import { useState, useEffect } from "react";

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export function usePortfolio(selectedSymbol: string) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    // Load portfolio from localStorage
    const saved = localStorage.getItem("portfolio");
    if (saved) setPortfolio(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  // Fetch price for current symbol
  useEffect(() => {
    async function fetchPrice() {
      const res = await fetch(`/api/alpha-candle?symbol=${selectedSymbol}`);
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
  }, [selectedSymbol]);

  // Buy stock logic
  function buyStock(quantity: number, price: number) {
    setPortfolio((prev) => {
      const exists = prev.find((p) => p.symbol === selectedSymbol);
      if (exists) {
        const totalCost = exists.avgPrice * exists.quantity + price * quantity;
        const totalQty = exists.quantity + quantity;
        return prev.map((p) =>
          p.symbol === selectedSymbol
            ? { symbol: p.symbol, quantity: totalQty, avgPrice: totalCost / totalQty }
            : p
        );
      } else {
        return [...prev, { symbol: selectedSymbol, quantity, avgPrice: price }];
      }
    });
  }

  // Sell stock logic
  function sellStock(quantity: number) {
    let canSell = false;
    setPortfolio((prev) => {
      const exists = prev.find((p) => p.symbol === selectedSymbol);
      if (!exists || exists.quantity < quantity) return prev;

      canSell = true;
      const remainingQty = exists.quantity - quantity;
      if (remainingQty === 0) {
        return prev.filter((p) => p.symbol !== selectedSymbol);
      } else {
        return prev.map((p) =>
          p.symbol === selectedSymbol ? { ...p, quantity: remainingQty } : p
        );
      }
    });
    return canSell;
  }

  return { portfolio, buyStock, sellStock, currentPrice };
}
