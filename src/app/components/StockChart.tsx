"use client";
import { useEffect, useState } from "react";
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

export default function StockChart({ symbol }: StockChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/alpha-candle?symbol=${symbol}`);
        const data = await res.json();
        console.log("Fetched data:", data);

        const series = data["Time Series (Daily)"];
        if (!series) {
          setChartData(null);
          setLoading(false);
          return;
        }

        const dates = Object.keys(series).slice(0, 30).reverse(); // Last 30 days, oldest first
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
      } catch (error) {
        console.error("Failed to fetch chart data", error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, [symbol]);

  if (loading) return <div>Loading chart...</div>;
  if (!chartData) return <div>No chart data available</div>;

  return (
  <div style={{ maxWidth: 720, height: 360, margin: "0 auto 40px" }}>
    <Line data={chartData} />
  </div>
);

}
