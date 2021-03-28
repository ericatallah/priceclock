const Express = require("express");
const fetch = require("node-fetch");

const app = Express();
const PORT = 3000;
const dataSources = [getCoinbasePrice];

async function getCoinbasePrice() {
  const resp = await fetch(
    "https://api.coinbase.com/v2/prices/spot?currency=USD"
  );
  const price = await resp.json();

  return price && price.data && price.data.amount;
}

async function getPrice() {
  const cb = await getCoinbasePrice();

  const avgPrice = cb / dataSources.length;
  return avgPrice;
}

app.get("/", async (req, res) => {
  const price = await getPrice();

  res.send(`<h1>${price}</h1>`);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
