export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const API_KEY = "HBGIKITMAARIDTW1";

  if (!symbol) {
    return new Response("Missing symbol", { status: 400 });
  }

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
  const apiRes = await fetch(url);
  const data = await apiRes.json();
  console.log("Fetched data:", data);

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
