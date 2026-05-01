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

// Favorites
function renderFavorites() {
  const favList = document.getElementById("favList");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favList.innerHTML = "";

  favorites.forEach(coin => {
    const li = document.createElement("li");

    li.textContent = `⭐ ${coin}`;
    li.classList.add("fav-item");

    //  CLICK TO REMOVE
    li.addEventListener("click", () => {
      removeFavorite(coin);
    });

    favList.appendChild(li);
  });
}

function removeFavorite(coin) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter(c => c !== coin);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderFavorites(); 
}

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");

  if (!toggleBtn) return;

  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    }
  });
});


// top gainers
import { fetchTopGainers } from "./api.js";

// top losers
import { fetchTopLosers } from "./api.js";

async function renderGainers() {
  const gainers = await fetchTopGainers();
  const container = document.getElementById("gainersList");

  container.innerHTML = gainers.map(coin => `
    <div class="gainer-card" data-id="${coin.id}">
      <h4>${coin.name}</h4>
      <span>+${coin.price_change_percentage_24h.toFixed(2)}%</span>
    </div>
  `).join("");

  // 👉 Click to load coin
  document.querySelectorAll(".gainer-card").forEach(card => {
    card.addEventListener("click", () => {
      const coinId = card.getAttribute("data-id");
      loadCoin(coinId);
    });
  });
}

async function loadCoin(coin) {
  try {
    loadCoin(coin);
  } catch {
    results.innerHTML = `<p class="error">❌ Not found</p>`;
  }
}
renderGainers();

//top losers
async function renderLosers() {
  const losers = await fetchTopLosers();
  const container = document.getElementById("losersList");

  container.innerHTML = losers.map(coin => `
    <div class="loser-card" data-id="${coin.id}">
      <h4>${coin.name}</h4>
      <span>${coin.price_change_percentage_24h.toFixed(2)}%</span>
    </div>
  `).join("");

  // Click to load coin
  document.querySelectorAll(".loser-card").forEach(card => {
    card.addEventListener("click", () => {
      const coinId = card.getAttribute("data-id");
      loadCoin(coinId);
    });
  });
}
renderLosers();

