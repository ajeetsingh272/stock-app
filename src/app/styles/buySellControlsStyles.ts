import { CSSProperties } from "react";

export const buySellControlsStyles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: 140,
    padding: "8px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    boxShadow: "inset 0 2px 5px #eee",
  },
  buttonBase: {
    padding: "10px 24px",
    borderRadius: 6,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  buyButton: {
    background: "#2d7be5",
  },
  buyButtonHover: {
    backgroundColor: "#1b5dab",
  },
  sellButton: {
    background: "#e53f2d",
  },
  sellButtonHover: {
    backgroundColor: "#9f241b",
  },
};
