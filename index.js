const express = require('express');
const cors = require('cors');
const path = require('path');
const dataSources = require('./utils/fetchPrice');
const { round, ceil, average } = require('./utils/math');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'client')));

async function getPrice() {
  const promises = dataSources.map(dataSource => dataSource());
  const prices = await Promise.all(promises);
  const btcPrices = [];
  const runePrices = [];
  prices.forEach((price) => {
    if (price.BTC) btcPrices.push(price.BTC);
    if (price.RUNE) runePrices.push(price.RUNE);
  })

  const avgBtcPrice = average(btcPrices);
  const avgRunePrice = average(runePrices);
  return { BTC: ceil(avgBtcPrice), RUNE: round(avgRunePrice) };
}

app.use(cors());

app.get('/prices', async (req, res) => {
  const priceData = await getPrice();
  res.json(priceData);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
