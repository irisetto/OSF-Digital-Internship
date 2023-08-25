const soapFunctions = require("./soap");
exports.getLatestValue = async (req, res, next) => {
  const selectedCurrency = req.params.currency;
  try {
    const latestValue = await soapFunctions.fetchLatestValue(selectedCurrency);

    res.json({ latestValue });
  } catch (error) {
    res.status(500).json({ error: "Error converting price" });
  }
};
