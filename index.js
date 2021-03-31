const express = require("express");
const cors = require('cors');
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const dataSources = [getCoinbasePrice, getNomicsPrice];
const NOMICS_DATA_URL = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,RUNE&convert=USD`; 
const COINBASE_DATA_URL = 'https://api.coinbase.com/v2/prices/spot?currency=USD';

app.use("/static", express.static(path.join(__dirname, "client")));

// cache prices in memory
const cachedBtcPrices = {
  nomics: 0,
  coinbase: 0,
};
const cachedRunePrices = {
  nomics: 0,
};

function round(num) {
  return num.toFixed(2);
}

function ceil(num) {
  return num.toFixed(0);
}

async function getNomicsPrice() {
  try {
    const resp = await fetch(NOMICS_DATA_URL);
    const data = await resp.json();
    const prices = {};
    data.forEach((item) => {
      prices[item.id] = +item.price;
    });

    if (prices.BTC) {
      cachedBtcPrices.nomics = prices.BTC;
    }

    if (prices.RUNE) {
      cachedRunePrices.nomics = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Nomics price data: ', e);
    // use cached prices instead
    return { BTC: cachedBtcPrices.nomics, RUNE: cachedRunePrices.nomics };
  }
}

async function getCoinbasePrice() {
  try {
    const resp = await fetch(COINBASE_DATA_URL);
    const priceData = await resp.json();
    const price = priceData && priceData.data && +priceData.data.amount;

    if (price) cachedBtcPrices.coinbase = price

    return price;
  } catch (e) {
    console.log('Error retrieving Coinbase price data: ', e);
    // use cached price instead
    return cachedBtcPrices.coinbase;
  }
}

async function getPrice() {
  const cbBtc = await getCoinbasePrice();
  const { BTC, RUNE } = await getNomicsPrice();

  const avgBtcPrice = (cbBtc + BTC) / dataSources.length;
  // RUNE price does not exist in cb data source
  const avgRunePrice = RUNE / (dataSources.length - 1);
  return { BTC: ceil(avgBtcPrice), RUNE: round(avgRunePrice) };
}

app.use(cors());

app.get("/prices", async (req, res) => {
  const priceData = await getPrice();
  res.json(priceData);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
