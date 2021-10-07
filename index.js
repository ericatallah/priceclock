const express = require('express');
const cors = require('cors');
const path = require('path');
const dataSources = require('./utils/fetchPrice');
const { round, ceil, average } = require('./utils/math');
require('dotenv').config();

const MAX_BTC_PRICE = 10000000;
const MAX_RUNE_PRICE = 1000;
const MAX_LUNA_PRICE = 10000;
const PORT = process.env.PORT;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'client')));

async function getPrice() {
  const promises = dataSources.map(dataSource => dataSource());
  const prices = await Promise.all(promises);
  const btcPrices = [];
  const runePrices = [];
  const lunaPrices = [];
  prices.forEach((price) => {
    if (price.BTC && price.BTC < MAX_BTC_PRICE) btcPrices.push(price.BTC);
    if (price.RUNE && price.RUNE < MAX_RUNE_PRICE) runePrices.push(price.RUNE);
    if (price.LUNA && price.LUNA < MAX_LUNA_PRICE) lunaPrices.push(price.LUNA);
  });

  const avgBtcPrice = average(btcPrices);
  const avgRunePrice = average(runePrices);
  const avgLunaPrice = average(lunaPrices);
  return {
    BTC: ceil(avgBtcPrice),
    RUNE: round(avgRunePrice),
    LUNA: round(avgLunaPrice),
  };
}

app.use(cors());

app.get('/prices', async (req, res) => {
  const priceData = await getPrice();
  res.json(priceData);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
