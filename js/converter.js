import { fetchRates } from "./api.js";

const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", async () => {
  const amt = parseFloat(amount.value);

  if (!amt) {
    result.innerText = "Enter valid amount";
    return;
  }

  const ratesData = await fetchRates(fromCurrency.value);
  const rate = ratesData.rates[toCurrency.value];

  const converted = (amt * rate).toFixed(2);

  result.innerText = `${amt} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
});