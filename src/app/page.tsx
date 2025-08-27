"use client";
import React, { useState } from "react";
import StockSelector from "./components/StockSelector";
import StockChart from "./components/StockChart";
import BuySellControls from "./components/BuySellControls";
import Portfolio from "./components/Portfolio";
import { usePortfolio } from "./hooks/usePortfolio";
import { useTradingWallet } from "./hooks/useTradingWallet";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const { wallet, buyStocks, sellStocks } = useTradingWallet();
  const { portfolio, buyStock, sellStock, currentPrice } = usePortfolio(selectedStock);

  const handleBuy = (quantity: number) => {
    if (!currentPrice) return;
    const totalCost = currentPrice * quantity;
    if (!buyStocks(totalCost)) {
      alert("Not enough funds in wallet.");
      return;
    }
    buyStock(quantity, currentPrice);
  };

    if (wallet === null) {
    return <div>Loading...</div>;
  }

  const handleSell = (quantity: number) => {
    if (!currentPrice) return;
    const proceeds = currentPrice * quantity;
    const success = sellStock(quantity);
    if (success) sellStocks(proceeds);
  };

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: 12,
        }}
      >
        <h1 style={{ fontWeight: "700", fontSize: 24, margin: 0 }}>Stock Price Viewer</h1>
        <div style={{ fontWeight: 600, fontSize: 16 }}>
          Wallet Balance: <span style={{ color: "#2d7be5" }}>${wallet.toFixed(2)}</span>
        </div>
      </header>

      {/* Stock Selector */}
      <StockSelector selected={selectedStock} setSelected={setSelectedStock} />

      {/* Chart and Controls */}
      <section
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <StockChart symbol={selectedStock} />
        <BuySellControls currentPrice={currentPrice} onBuy={handleBuy} onSell={handleSell} />
      </section>

      {/* Portfolio Table */}
      <section
        style={{
          width: "100%",
          maxWidth: 720,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 8,
          padding: 20,
          backgroundColor: "#f9fafb",
        }}
      >
        <Portfolio portfolio={portfolio} />
      </section>
    </main>
  );
}
