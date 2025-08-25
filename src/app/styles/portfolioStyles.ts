import { CSSProperties } from "react";

export const portfolioStyles: { [key: string]: CSSProperties } = {
  noStocksText: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 30,
  },
  table: {
    borderCollapse: "collapse",
    margin: "40px auto",
    width: "80%",
    maxWidth: 700,
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.1)",
    borderRadius: 8,
    overflow: "hidden",
    fontSize: 16,
  },
  thead: {
    backgroundColor: "#f0f4f8",
    fontWeight: "bold",
  },
  th: {
    padding: "12px 25px",
    textAlign: "center",
  },
  tr: {
    borderBottom: "1px solid #eee",
  },
  tdSymbol: {
    textAlign: "center",
    padding: "15px 25px",
    fontWeight: 600,
  },
  td: {
    textAlign: "center",
    padding: "15px 25px",
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};
