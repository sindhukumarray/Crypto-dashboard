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

// top gainers
export async function fetchTopGainers() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
  );

  const data = await res.json();

  // Sort by highest gain %
  return data
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 6);
}

// top losers
export async function fetchTopLosers() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
  );

  const data = await res.json();

  // Sort lowest % first
  return data
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 6);
}