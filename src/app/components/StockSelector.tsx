"use client";
import React, { useState, useEffect, useCallback } from "react";

const stocks = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
];

interface StockSelectorProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const StockSelector: React.FC<StockSelectorProps> = ({ selected, setSelected }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`/api/alpha-candle?symbol=${selected}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const series = data["Time Series (Daily)"];
      if (series) {
        const latestDate = Object.keys(series)[0];
        const priceVal = Number(series[latestDate]["4. close"]);
        setPrice(priceVal);
      } else setPrice(null);
    } catch (err) {
      setError("Failed to fetch price");
      setPrice(null);
    }
  }, [selected]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return (
    <div style={{ textAlign: "center", marginBottom: 12 }}>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ fontSize: 18, padding: "5px 12px", marginRight: 10 }}
      >
        {stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
      <div>
        <span style={{ fontWeight: 500 }}>
          {stocks.find(s => s.symbol === selected)?.name} ({selected})
        </span>
      </div>
      <div>
        Price: {error ? error : price !== null ? `$${price.toFixed(2)}` : "Loading..."}
      </div>
    </div>
  );
};

export default StockSelector;
