import { useState } from "react";

interface UseTradingWalletProps {
  initialWallet?: number; // Optional initial balance
}

export function useTradingWallet(initialWallet = 10000) {
  // Wallet balance state
  const [wallet, setWallet] = useState<number>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem("wallet") : null;
    return saved ? Number(saved) : initialWallet;
  });

  // Save wallet to localStorage on change (client-side only)
  if (typeof window !== "undefined") {
    localStorage.setItem("wallet", wallet.toString());
  }

  // Attempt to buy stocks of cost 'totalCost'
  // Returns true if successful; false if insufficient funds
  function buyStocks(totalCost: number): boolean {
    if (wallet < totalCost) {
      return false; // not enough funds
    }
    setWallet(wallet - totalCost);
    return true;
  }

  // Sell stocks of totalValue, increase wallet
  function sellStocks(totalValue: number) {
    setWallet(wallet + totalValue);
  }

  return { wallet, buyStocks, sellStocks };
}
