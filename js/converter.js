import { fetchRates } from "./api.js";

const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// to  Load ALL currencies dynamically
async function loadCurrencies() {
  const data = await fetchRates("USD");

  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  // default selection
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

// Convert
convertBtn.addEventListener("click", async () => {
  const amt = parseFloat(amount.value);

  if (!amt) {
    result.innerText = "Enter valid amount";
    return;
  }

  const data = await fetchRates(fromCurrency.value);
  const rate = data.rates[toCurrency.value];

  const converted = (amt * rate).toFixed(2);

  result.innerText = `${amt} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
});

loadCurrencies();
