"use client";
import React from "react";

interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

// export default function Portfolio({ portfolio }: PortfolioProps) {
//   if (portfolio.length === 0) {
//     return <p>No stocks owned</p>;
//   }

//   return (
//       <table style={{
//     borderCollapse: "collapse",
//     margin: "24px auto",
//     minWidth: 350,
//     boxShadow: "0 2px 12px #0000000d"
//   }}>
//     <thead>
//       <tr style={{background: "#f6f6f6"}}>
//         <th style={{padding: "10px 18px"}}>Symbol</th>
//         <th style={{padding: "10px 18px"}}>Quantity</th>
//         <th style={{padding: "10px 18px"}}>Avg Price</th>
//       </tr>
//     </thead>
//     <tbody>
//       {portfolio.map((item) => (
//         <tr key={item.symbol}>
//           <td style={{textAlign: "center", padding: 10}}>{item.symbol}</td>
//           <td style={{textAlign: "center", padding: 10}}>{item.quantity}</td>
//           <td style={{textAlign: "center", padding: 10}}>${item.avgPrice.toFixed(2)}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//   );
// }

export default function Portfolio({ portfolio }: PortfolioProps) {
  if (portfolio.length === 0) {
    return (
      <p style={{ textAlign: "center", fontStyle: "italic", marginTop: 30 }}>
        No stocks owned
      </p>
    );
  }

  return (
    <table style={{
      borderCollapse: "collapse",
      margin: "40px auto",
      width: "80%",
      maxWidth: 700,
      boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
      borderRadius: 8,
      overflow: "hidden",
      fontSize: 16,
    }}>
      <thead style={{ backgroundColor: "#f0f4f8", fontWeight: "bold" }}>
        <tr>
          <th style={{ padding: "12px 25px", textAlign: "center" }}>Symbol</th>
          <th style={{ padding: "12px 25px", textAlign: "center" }}>Quantity</th>
          <th style={{ padding: "12px 25px", textAlign: "center" }}>Avg Price</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map(({ symbol, quantity, avgPrice }) => (
          <tr key={symbol} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ textAlign: "center", padding: "15px 25px", fontWeight: 600 }}>{symbol}</td>
            <td style={{ textAlign: "center", padding: "15px 25px" }}>{quantity}</td>
            <td style={{ textAlign: "center", padding: "15px 25px" }}>${avgPrice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
