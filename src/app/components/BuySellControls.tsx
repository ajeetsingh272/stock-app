"use client";
import React, { useState, useCallback } from "react";
import { buySellControlsStyles as styles } from "../styles/buySellControlsStyles";

interface BuySellControlsProps {
  currentPrice: number | null;
  onBuy: (quantity: number) => void;
  onSell: (quantity: number) => void;
}

const BuySellControls: React.FC<BuySellControlsProps> = ({ currentPrice, onBuy, onSell }) => {
  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const [buyHover, setBuyHover] = useState(false);
  const [sellHover, setSellHover] = useState(false);

  const handleBuy = useCallback(() => {
    if (inputQuantity > 0) {
      onBuy(inputQuantity);
      setInputQuantity(0);
    }
  }, [inputQuantity, onBuy]);

  const handleSell = useCallback(() => {
    if (inputQuantity > 0) {
      onSell(inputQuantity);
      setInputQuantity(0);
    }
  }, [inputQuantity, onSell]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const num = Number(value);
      if (value === "") {
        setInputQuantity(0);
      } else if (!isNaN(num) && num >= 0 && Number.isInteger(num)) {
        setInputQuantity(num);
      }
    },
    []
  );

  return (
    <div style={styles.container}>
      <input
        type="number"
        min={1}
        value={inputQuantity > 0 ? inputQuantity : ""}
        placeholder={`Qty (Price: $${currentPrice?.toFixed(2) ?? "N/A"})`}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button
        type="button"
        onClick={handleBuy}
        style={{
          ...styles.buttonBase,
          ...styles.buyButton,
          ...(buyHover ? styles.buyButtonHover : {}),
        }}
        onMouseEnter={() => setBuyHover(true)}
        onMouseLeave={() => setBuyHover(false)}
        disabled={inputQuantity <= 0 || !currentPrice}
        aria-disabled={inputQuantity <= 0 || !currentPrice}
      >
        Buy
      </button>
      <button
        type="button"
        onClick={handleSell}
        style={{
          ...styles.buttonBase,
          ...styles.sellButton,
          ...(sellHover ? styles.sellButtonHover : {}),
        }}
        onMouseEnter={() => setSellHover(true)}
        onMouseLeave={() => setSellHover(false)}
        disabled={inputQuantity <= 0 || !currentPrice}
        aria-disabled={inputQuantity <= 0 || !currentPrice}
      >
        Sell
      </button>
    </div>
  );
};

export default BuySellControls;
