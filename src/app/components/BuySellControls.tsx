"use client";
import React, { useState } from "react";

interface BuySellControlsProps {
  currentPrice: number | null;
  onBuy: (quantity: number) => void;
  onSell: (quantity: number) => void;
}

// export default function BuySellControls({
//   currentPrice,
//   onBuy,
//   onSell,
// }: BuySellControlsProps) {
//   const [inputQuantity, setInputQuantity] = useState<number>(0);

//   function handleBuy() {
//     if (inputQuantity > 0) {
//       onBuy(inputQuantity);
//       setInputQuantity(0);
//     }
//   }

//   function handleSell() {
//     if (inputQuantity > 0) {
//       onSell(inputQuantity);
//       setInputQuantity(0);
//     }
//   }

//   return (
//      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//     <input
//       type="number"
//       min={1}
//       value={inputQuantity}
//       placeholder={`Qty (Price: $${currentPrice?.toFixed(2) ?? "N/A"})`}
//       onChange={(e) => setInputQuantity(Number(e.target.value))}
//       style={{ width: 120, padding: 6, fontSize: "1em", borderRadius: 4, border: "1px solid #ccc"}}
//     />
//     <button
//       onClick={handleBuy}
//       style={{
//         padding: "7px 18px", borderRadius: 4, background: "#2d7be5", color: "#fff", border: "none", cursor: "pointer"
//       }}
//     >
//       Buy
//     </button>
//     <button
//       onClick={handleSell}
//       style={{
//         padding: "7px 18px", borderRadius: 4, background: "#e53f2d", color: "#fff", border: "none", cursor: "pointer"
//       }}
//     >
//       Sell
//     </button>
//   </div>
//   );
// }


export default function BuySellControls({ currentPrice, onBuy, onSell }: BuySellControlsProps) {
  const [inputQuantity, setInputQuantity] = useState<number>(0);

  function handleBuy() {
    if (inputQuantity > 0) {
      onBuy(inputQuantity);
      setInputQuantity(0);
    }
  }

  function handleSell() {
    if (inputQuantity > 0) {
      onSell(inputQuantity);
      setInputQuantity(0);
    }
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 15,
      justifyContent: "center",
      marginTop: 20,
    }}>
      <input
        type="number"
        min={1}
        value={inputQuantity}
        placeholder={`Qty (Price: $${currentPrice?.toFixed(2) ?? "N/A"})`}
        onChange={(e) => setInputQuantity(Number(e.target.value))}
        style={{
          width: 140,
          padding: "8px 12px",
          fontSize: 16,
          borderRadius: 6,
          border: "1px solid #ccc",
          boxShadow: "inset 0 2px 5px #eee",
        }}
      />
      <button
        onClick={handleBuy}
        style={{
          padding: "10px 24px",
          borderRadius: 6,
          background: "#2d7be5",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1b5dab")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d7be5")}
      >
        Buy
      </button>
      <button
        onClick={handleSell}
        style={{
          padding: "10px 24px",
          borderRadius: 6,
          background: "#e53f2d",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9f241b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e53f2d")}
      >
        Sell
      </button>
    </div>
  );
}
