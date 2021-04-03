const fetch = require('node-fetch');
const {
  parseCmcPrices,
  parseCbPrices,
  parseNomicsPrices
} = require('./priceParser');
const {
  COINBASE_DATA_URL,
  CMC_DATA_URL,
  NOMICS_DATA_URL,
} = require('./constants');

// cache prices in memory
const cachedBtcPrices = {
  nomics: 0,
  coinbase: 0,
  cmc: 0
};
const cachedRunePrices = {
  nomics: 0,
  cmc: 0
};

async function getCmcPrice() {
  try {
    const resp = await fetch(CMC_DATA_URL);
    const data = await resp.json();
    const prices = parseCmcPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.cmc = prices.BTC;
    }

    if (prices.RUNE) {
      cachedRunePrices.cmc = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Nomics price data: ', e);
    // use cached prices instead
    return { BTC: cachedBtcPrices.cmc, RUNE: cachedRunePrices.cmc };
  }
}

async function getNomicsPrice() {
  try {
    const resp = await fetch(NOMICS_DATA_URL);
    const data = await resp.json();
    const prices = parseNomicsPrices(data);

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
    const data = await resp.json();
    const price = parseCbPrices(data);

    if (price) cachedBtcPrices.coinbase = price

    return { BTC: price };
  } catch (e) {
    console.log('Error retrieving Coinbase price data: ', e);
    // use cached price instead
    return { BTC: cachedBtcPrices.coinbase };
  }
}

module.exports = [getCmcPrice, getNomicsPrice, getCoinbasePrice];
