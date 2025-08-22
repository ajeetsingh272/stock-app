"use client";
import React from "react";
import { useState, useEffect } from "react";


const stocks = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
];


  const API_KEY = "d2k27jpr01qj8a5lmog0d2k27jpr01qj8a5lmogg";



interface StockSelectorProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}


export default function StockSelector({ selected, setSelected }: StockSelectorProps) {
    // const [selected, setSelected] = useState("AAPL");
  const [price, setPrice] = useState<number | null>(null);


  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${selected}&token=${API_KEY}`
        );
        const data = await res.json();
        // 'c' is the current price in Finnhub API response
        setPrice(typeof data.c === "number" ? data.c : null);
      } catch (error) {
        console.error("Failed to fetch stock price", error);
        setPrice(null);
      }
    }


    fetchPrice();
  }, [selected]);


  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
      <h2>
        Price: {typeof price === "number" ? `$${price.toFixed(2)}` : "Loading..."}
      </h2>
    </div>
  );
}