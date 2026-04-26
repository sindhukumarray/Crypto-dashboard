import { fetchCoin, fetchHistory } from "./api.js";
import { saveFavorite, loadFavorites } from "./utils.js";

const search = document.getElementById("search");
const results = document.getElementById("results");
const favList = document.getElementById("favList");

let chart;

// 🔍 Search Event
search.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const coin = search.value.toLowerCase().trim();

    if (!coin) return;

    try {
      results.innerHTML = "Loading...";
      const data = await fetchCoin(coin);

      renderResult(data);
      renderChart(coin);

    } catch {
      results.innerHTML = `<p class="error">❌ Coin not found</p>`;
    }
  }
});

// 📊 Render Result
function renderResult(data) {
  results.innerHTML = `
    <div class="card">
      <img src="${data.image.small}" />
      <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
      <p>💰 $${data.market_data.current_price.usd}</p>
      <p>📉 ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <button id="favBtn">⭐ Add to Favorites</button>
    </div>
  `;

  document.getElementById("favBtn").onclick = () => {
    saveFavorite(data.id);
    renderFavorites();
  };
}

// 📈 Chart
async function renderChart(coin) {
  const history = await fetchHistory(coin);

  const ctx = document.getElementById("priceChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.prices.map(p =>
        new Date(p[0]).toLocaleDateString()
      ),
      datasets: [{
        label: `${coin} Price`,
        data: history.prices.map(p => p[1]),
      }]
    }
  });
}

// ⭐ Favorites
function renderFavorites() {
  const favs = loadFavorites();

  favList.innerHTML = favs
    .map(f => `<li>⭐ ${f}</li>`)
    .join("");
}

renderFavorites();