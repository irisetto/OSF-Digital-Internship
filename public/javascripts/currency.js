const currencySelector = document.getElementById("currency-selector");
const priceAmount = document.querySelector(".price-amount");
const currencySymbol = document.querySelector(".currency-symbol");
let USDtoRON = 0;
async function convertUSDtoRON() {
  const responseUSD = await fetch(`/api/latestValue/USD`);
  if (!responseUSD.ok) {
    throw new Error("Network responseUSD was not ok");
  }
  const data = await responseUSD.json();
  USDtoRON = priceAmount.textContent * data.latestValue;
}

currencySelector?.addEventListener("change", async () => {
  const selectedCurrency = currencySelector.value;
  try {
    const latestValue = await getLatestValue(selectedCurrency);
    const convertedPrice = USDtoRON / latestValue;
    priceAmount.textContent = convertedPrice.toFixed(2);
    currencySymbol.textContent = ` ${selectedCurrency} `;
  } catch (error) {
    console.error("Error:", error);
  }
});

async function getLatestValue(currency) {
  const response = await fetch(`/api/latestValue/${currency}`);
  if (!response.ok) {
    throw new Error("Network responseUSD was not ok");
  }
  const data = await response.json();
  return await data.latestValue;
}

convertUSDtoRON();
