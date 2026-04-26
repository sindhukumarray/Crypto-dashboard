const API_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoin(coin = "bitcoin") {
  const res = await fetch(`${API_URL}/coins/${coin}`);
  if (!res.ok) throw new Error("Coin not found");
  return res.json();
}

export async function fetchHistory(coin = "bitcoin") {
  const res = await fetch(
    `${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
  );
  if (!res.ok) throw new Error("History error");
  return res.json();
}