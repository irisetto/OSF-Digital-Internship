const currencySelector = document.getElementById('currency-selector');
const priceAmount = document.querySelector('.price-amount');
const currencySymbol = document.querySelector('.currency-symbol');

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  RON: 4.53, 
  GBP: 0.78,
};
const symbols = {
    USD: ' $ ',
    EUR: ' € ',
    RON: ' RON ',
    GBP: ' £ ',
  };
currencySelector.addEventListener('change', () => {
  const selectedCurrency = currencySelector.value;
  const exchangeRate = exchangeRates[selectedCurrency];
  const originalPrice = parseFloat(priceAmount.textContent);
  const convertedPrice = originalPrice * exchangeRate;
  priceAmount.textContent = convertedPrice.toFixed(2); 
  currencySymbol.textContent = symbols[selectedCurrency]; 

});
