"use client";
import { useState, useEffect } from "react";
import StockSelector from "./components/StockSelector";
import StockChart from "./components/StockChart";
import BuySellControls from "./components/BuySellControls";
import Portfolio from "./components/Portfolio";

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    async function fetchPrice() {
      const res = await fetch(`/api/alpha-candle?symbol=${selectedStock}`);
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
  }, [selectedStock]);

  // Now handlers accept only quantity and use closure for symbol and price
  function buyStock(quantity: number) {
    if (quantity <= 0 || !currentPrice) return;
    setPortfolio((prev) => {
      const exists = prev.find((p) => p.symbol === selectedStock);
      if (exists) {
        const totalCost = exists.avgPrice * exists.quantity + currentPrice * quantity;
        const totalQty = exists.quantity + quantity;
        return prev.map((p) =>
          p.symbol === selectedStock
            ? { symbol: p.symbol, quantity: totalQty, avgPrice: totalCost / totalQty }
            : p
        );
      } else {
        return [...prev, { symbol: selectedStock, quantity, avgPrice: currentPrice }];
      }
    });
  }

  function sellStock(quantity: number) {
    if (quantity <= 0) return;
    setPortfolio((prev) => {
      const exists = prev.find((p) => p.symbol === selectedStock);
      if (!exists || exists.quantity < quantity) return prev;

      const remainingQty = exists.quantity - quantity;
      if (remainingQty === 0) {
        return prev.filter((p) => p.symbol !== selectedStock);
      } else {
        return prev.map((p) =>
          p.symbol === selectedStock ? { ...p, quantity: remainingQty } : p
        );
      }
    });
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Stock Price Viewer</h1>

      <StockSelector selected={selectedStock} setSelected={setSelectedStock} />

      <StockChart symbol={selectedStock} />

      <BuySellControls
        currentPrice={currentPrice}
        onBuy={buyStock}
        onSell={sellStock}
      />

      <Portfolio portfolio={portfolio} />
    </main>
  );
}
