"use client";
import React from "react";
import { portfolioStyles as styles } from "../styles/portfolioStyles";

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  if (portfolio.length === 0) {
    return <p style={styles.noStocksText}>No stocks owned</p>;
  }

  return (
    <table style={styles.table} aria-label="Stock portfolio">
      <caption style={styles.visuallyHidden}>Owned stocks with quantity and average price</caption>
      <thead style={styles.thead}>
        <tr>
          <th scope="col" style={styles.th}>Symbol</th>
          <th scope="col" style={styles.th}>Quantity</th>
          <th scope="col" style={styles.th}>Avg Price</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map(({ symbol, quantity, avgPrice }) => (
          <tr key={symbol} style={styles.tr}>
            <td style={styles.tdSymbol}>{symbol}</td>
            <td style={styles.td}>{quantity}</td>
            <td style={styles.td}>${avgPrice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Portfolio);
