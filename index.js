const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const dataSources = [getCoinbasePrice, getNomicsPrice];

app.use("/static", express.static(path.join(__dirname, "client")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

function round(num) {
  return Math.round(num * 100) / 100;
}

function ceil(num) {
  return Math.ceil(num);
}

async function getNomicsPrice() {
  const resp = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,RUNE&convert=USD`
  );
  const data = await resp.json();
  const prices = {};
  data.forEach((item) => {
    prices[item.id] = +item.price;
  });

  return prices;
}

async function getCoinbasePrice() {
  const resp = await fetch(
    "https://api.coinbase.com/v2/prices/spot?currency=USD"
  );
  const price = await resp.json();

  return price && price.data && +price.data.amount;
}

async function getPrice() {
  const cbBtc = await getCoinbasePrice();
  const { BTC, RUNE } = await getNomicsPrice();

  const avgBtcPrice = (cbBtc + BTC) / dataSources.length;
  // RUNE price does not exist in cb data source
  const avgRunePrice = RUNE / (dataSources.length - 1);
  return { BTC: ceil(avgBtcPrice), RUNE: round(avgRunePrice) };
}

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./client", "index.html"));
});

app.get("/prices", async (req, res) => {
  const priceData = await getPrice();
  res.json(priceData);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
