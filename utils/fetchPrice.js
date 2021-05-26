require('dotenv').config();
const fetch = require('node-fetch');
const {
  parseMessariPrices,
  parseCmcPrices,
  parseCbPrices,
  parseNomicsPrices,
  parseCoinGeckoPrices,
  parseCoincapPrices,
} = require('./priceParser');
const {
  COINBASE_DATA_URL,
  CMC_DATA_URL,
  NOMICS_DATA_URL,
  COIN_GECKO_DATA_URL,
  MESSARI_BTC_DATA_URL,
  MESSARI_RUNE_DATA_URL,
  COIN_CAP_DATA_URL,
} = require('./constants');

// cache prices in memory
const cachedBtcPrices = {
  nomics: 0,
  coinbase: 0,
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedRunePrices = {
  nomics: 0,
  cmc: 0,
  messari: 0,
  coincap: 0,
};

async function getCoincapPrice() {
  try {
    const resp = await fetch(COIN_CAP_DATA_URL);
    const data = await resp.json();
    const prices = parseCoincapPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.coincap = prices.BTC;
    }

    if (prices.RUNE) {
      cachedRunePrices.coincap = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coincap price data: ', e);
    // use cached prices instead
    return { BTC: cachedBtcPrices.coincap, RUNE: cachedRunePrices.coincap };
  }
}

async function getMessariBtcPrice() {
  try {
    const resp = await fetch(MESSARI_BTC_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'BTC');

    if (prices.BTC) {
      cachedBtcPrices.messari = prices.BTC;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari BTC price data: ', e);
    // use cached prices instead
    return { BTC: cachedBtcPrices.messari };
  }
}

async function getMessariRunePrice() {
  try {
    const resp = await fetch(MESSARI_RUNE_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'RUNE');

    if (prices.RUNE) {
      cachedRunePrices.messari = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari RUNE price data: ', e);
    // use cached prices instead
    return { RUNE: cachedRunePrices.messari };
  }
}

async function getCoinGeckoPrice() {
  try {
    const resp = await fetch(COIN_GECKO_DATA_URL);
    const data = await resp.json();
    const prices = parseCoinGeckoPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.coingecko = prices.BTC;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinGecko price data: ', e);
    // use cached prices instead
    return { BTC: cachedBtcPrices.coingecko };
  }
}

async function getCmcPrice() {
  try {
    const resp = await fetch(CMC_DATA_URL);
    const data = await resp.json();
    if (data.status && data.status.error_code === 1010) {
      // limit reached, so remove from calculation
      console.log('CMC limit reached, data not included in price average.');
      return {};
    }
    const prices = parseCmcPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.cmc = prices.BTC;
    }

    if (prices.RUNE) {
      cachedRunePrices.cmc = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinMarketCap price data: ', e);
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
    const prices = parseCbPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.coinbase = prices.BTC;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coinbase price data: ', e);
    // use cached price instead
    return { BTC: cachedBtcPrices.coinbase };
  }
}

module.exports = [getCoincapPrice, getMessariBtcPrice, getMessariRunePrice, getCoinGeckoPrice, getCmcPrice, getNomicsPrice, getCoinbasePrice];
