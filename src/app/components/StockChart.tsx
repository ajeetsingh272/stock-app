"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  symbol: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      font: { size: 18, weight: "bold" },
    },
    tooltip: { mode: "index", intersect: false },
  },
  interaction: { mode: "nearest", intersect: false },
  scales: {
    x: {
      display: true,
      title: { display: true, text: "Date" },
      ticks: { maxRotation: 45, minRotation: 45, maxTicksLimit: 10 },
    },
    y: {
      display: true,
      title: { display: true, text: "Price (USD)" },
      beginAtZero: false,
    },
  },
};

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/alpha-candle?symbol=${symbol}`);
        if (!res.ok) throw new Error(`Failed to fetch data (${res.status})`);
        const data = await res.json();
        const series = data["Time Series (Daily)"];
        if (!series) {
          setChartData(null);
          setError("No historical data available.");
          return;
        }
        const dates = Object.keys(series).slice(0, 30).reverse();
        const prices = dates.map((date) => Number(series[date]["4. close"]));
        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Closing Price`,
              data: prices,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
            },
          ],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStockData();
  }, [symbol]);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  if (!chartData) return <div>No chart data available</div>;

  return (
    <div style={{ width: "100%",
      minHeight: 400,
      maxWidth: 720,
      margin: "0 auto 32px",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24, }}>
      <Line data={chartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins?.title, text: `${symbol} Stock Closing Prices (Last 30 Days)` } }}} />
    </div>
  );
};

export default StockChart;
