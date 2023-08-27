const soap = require("soap");
const currencyConverterUrl = "http://infovalutar.ro/curs.asmx?wsdl";

exports.fetchAvailableCurrencies = async () => {
  return new Promise((resolve, reject) => {
    soap.createClient(currencyConverterUrl, (err, client) => {
      if (err) {
        console.error(err);
      } else {
        const formattedDate = new Date().toISOString();
        client.getall({ dt: formattedDate }, async (err, result) => {
          if (err) {
            console.error(err);
          }

          // Extract currency codes from the response
          const currencies =
            result.getallResult.diffgram?.DocumentElement?.Currency.map(
              (currency) => currency.IDMoneda
            );
          resolve(currencies);
        });
      }
    });
  });
};

exports.fetchLatestValue = async (moneda) => {
    return new Promise((resolve, reject) => {
      soap.createClient(currencyConverterUrl, (err, client) => {
        if (err) {
          console.error(err);
        } else {
          client.getlatestvalue({ Moneda : moneda }, async (err, result) => {
            if (err) {
              console.error(err);
            }
  
            // Extract currency codes from the response
            const latestValue =
             result.getlatestvalueResult;
            resolve(latestValue);
          });
        }
      });
    });
  };