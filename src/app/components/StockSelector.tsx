"use client";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { stocks } from "../data/stocks";

interface StockSelectorProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const StockSelector: React.FC<StockSelectorProps> = ({ selected, setSelected }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
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
      } catch {
        setError("Failed to fetch price");
        setPrice(null);
      }
    }
    fetchPrice();
  }, [selected]);

  // Handle selection event from react-select
  function handleChange(option: SingleValue<{ value: string; label: string }>) {
    if (option) {
      setSelected(option.value);
    }
  }

  const selectedOption = stocks.find((stock) => stock.value === selected) || null;

  return (
    <div style={{ maxWidth: 300, margin: "0 auto 16px" }}>
      <Select
        options={stocks}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Search and select stock..."
        isClearable={false}
      />
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <div><strong>{selectedOption?.label}</strong></div>
        <div>
          Price: {error ? error : price !== null ? `$${price.toFixed(2)}` : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default StockSelector;
