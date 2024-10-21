const express = require('express');
const cors = require('cors');
const path = require('path');
const dataSources = require('./utils/fetchPrice');
const { round, ceil, average } = require('./utils/math');
require('dotenv').config();

const MAX_BTC_PRICE = 10000000;
const MAX_WRLD_PRICE = 1000;
const MAX_LUNA_PRICE = 10000;
const PORT = process.env.PORT;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'client')));

async function getPrice() {
  const promises = dataSources.map(dataSource => dataSource());
  const prices = await Promise.all(promises);
  const symbolToPriceArray = {};

  for (const priceObj of prices) {
    for (const [symbol, price] of Object.entries(priceObj)) {
      if (!symbolToPriceArray[symbol]) symbolToPriceArray[symbol] = [];
      symbolToPriceArray[symbol].push(price);
    }
  }

  const avgPrices = {};

  for (const [symbol, priceList] of Object.entries(symbolToPriceArray)) {
    avgPrices[symbol] = average(priceList);
    switch (symbol) {
      case 'BTC':
      case 'ETH':
        avgPrices[symbol] = ceil(avgPrices[symbol]);
        break;
      case 'TOPIA':
        avgPrices[symbol] = round(avgPrices[symbol], 3);
        break;
      case 'XRP':
      case 'RUNE':
      case 'MSTR':
        avgPrices[symbol] = round(avgPrices[symbol]);
        break;
      case 'PNDC':
      case 'PORK':
        avgPrices[symbol] = round(avgPrices[symbol], 8);
        break;
    }
  }

  return avgPrices;
}

app.use(cors());

app.get('/prices', async (req, res) => {
  const priceData = await getPrice();
  res.json(priceData);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
