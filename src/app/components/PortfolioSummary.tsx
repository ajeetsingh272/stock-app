import React from "react";

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

interface PortfolioSummaryProps {
  portfolio: PortfolioItem[];
  currentPrices: Record<string, number>;
}

function getInvestedValue(portfolio: PortfolioItem[]) {
  return portfolio.reduce(
    (sum, { quantity, avgPrice }) => sum + quantity * avgPrice,
    0
  );
}

function getCurrentValue(portfolio: PortfolioItem[], currentPrices: Record<string, number>) {
  return portfolio.reduce(
    (sum, { symbol, quantity }) => sum + (currentPrices[symbol] || 0) * quantity,
    0
  );
}

export default function PortfolioSummary({ portfolio, currentPrices }: PortfolioSummaryProps) {
  const invested = getInvestedValue(portfolio);
  const current = getCurrentValue(portfolio, currentPrices);
  const gain = current - invested;
  const gainPct = invested > 0 ? (gain / invested) * 100 : 0;

  
  let todaysLoss = 0;
  let todaysLossPct = 0;
  if (portfolio.length > 0) {
    todaysLoss = portfolio.reduce((sum, { symbol, quantity }) => {
      
      const today = currentPrices[symbol] ?? 0;
      const prev = currentPrices[symbol + "_prev"] ?? today;
      return sum + (today - prev) * quantity;
    }, 0);

    const prevValue = portfolio.reduce((sum, { symbol, quantity }) => {
      const prev = currentPrices[symbol + "_prev"] ?? (currentPrices[symbol] ?? 0);
      return sum + prev * quantity;
    }, 0);
    todaysLossPct = prevValue > 0 ? (todaysLoss / prevValue) * 100 : 0;
  }

  return (
    <div
      style={{
        background: "linear-gradient(125deg, #202637 80%, #151924 100%)",
        borderRadius: 16,
        padding: "26px 36px",
        boxShadow: "0 2px 8px rgba(44, 62, 80, 0.08)",
        color: "#fff",
        width: 380,
        maxWidth: "95%",
        margin: "0 auto 28px auto",
        fontFamily: "inherit",
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        ₹{current.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <div style={{ color: "#32dfa2", fontWeight: 700, marginBottom: 6 }}>
        ▲ Overall Gain&nbsp;
        ₹{gain.toLocaleString(undefined, { maximumFractionDigits: 2 })} &nbsp;
        <span style={{ fontWeight: 600 }}>
          ({gainPct >= 0 ? "+" : ""}
          {gainPct.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)
        </span>
      </div>
      <div style={{ fontSize: 16, marginBottom: 4 }}>
        <span style={{ color: "#aaa" }}>Invested Value</span>
        <br />
        ₹{invested.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <div style={{ color: "#ff7175", fontWeight: 700, marginTop: 7 }}>
        ▼ Today's Loss&nbsp;
        ₹{todaysLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        &nbsp;({todaysLossPct >= 0 ? "+" : ""}
        {todaysLossPct.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)
      </div>
    </div>
  );
}
