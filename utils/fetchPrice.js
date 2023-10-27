require('dotenv').config();
const fetch = require('node-fetch');
const {
  parseMessariPrices,
  parseCmcPrices,
  parseCbPrices,
  parseCoinGeckoPrices,
  parseCoincapPrices,
} = require('./priceParser');
const {
  COINBASE_DATA_URL,
  CMC_DATA_URL,
  COIN_GECKO_DATA_URL,
  MESSARI_BTC_DATA_URL,
  MESSARI_HYTOPIA_DATA_URL,
  COIN_CAP_DATA_URL,
  MESSARI_LUNA_DATA_URL,
  MESSARI_ETH_DATA_URL,
  MESSARI_PNDC_DATA_URL,
  MESSARI_RUNE_DATA_URL,
  MESSARI_PEPE_DATA_URL,
} = require('./constants');

// cache prices in memory
const cachedBtcPrices = {
  coinbase: 0,
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedEthPrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedRunePrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedTopiaPrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
};
const cachedPepePrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
};
const cachedPndcPrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
};

async function getCoincapPrice() {
  try {
    const resp = await fetch(COIN_CAP_DATA_URL);
    const data = await resp.json();
    const prices = parseCoincapPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.coincap = prices.BTC;
    }

    if (prices.ETH) {
      cachedEthPrices.coincap = prices.ETH;
    }

    if (prices.RUNE) {
      cachedRunePrices.coincap = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coincap price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.coincap,
      WRLD: cachedTopiaPrices.coincap,
      LUNA: cachedLunaPrices.coincap,
    };
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

async function getMessariEthPrice() {
  try {
    const resp = await fetch(MESSARI_ETH_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'ETH');

    if (prices.ETH) {
      cachedEthPrices.messari = prices.ETH;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari ETH price data: ', e);
    // use cached prices instead
    return { ETH: cachedEthPrices.messari };
  }
}

async function getMessariTopiaPrice() {
  try {
    const resp = await fetch(MESSARI_HYTOPIA_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'TOPIA');

    if (prices.TOPIA) {
      cachedTopiaPrices.messari = prices.TOPIA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari TOPIA price data: ', e);
    // use cached prices instead
    return { TOPIA: cachedTopiaPrices.messari };
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

async function getMessariPndcPrice() {
  try {
    const resp = await fetch(MESSARI_PNDC_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'PNDC');

    if (prices.PNDC) {
      cachedPndcPrices.messari = prices.PNDC;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari PNDC price data: ', e);
    // use cached prices instead
    return { PNDC: cachedPndcPrices.messari };
  }
}

async function getMessariPepePrice() {
  try {
    const resp = await fetch(MESSARI_PEPE_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'PEPE');

    if (prices.PEPE) {
      cachedPepePrices.messari = prices.PEPE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari PEPE price data: ', e);
    // use cached prices instead
    return { PEPE: cachedPepePrices.messari };
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

    if (prices.ETH) {
      cachedEthPrices.coingecko = prices.ETH;
    }

    if (prices.TOPIA) {
      cachedTopiaPrices.coingecko = prices.TOPIA;
    }

    if (prices.PEPE) {
      cachedPepePrices.coingecko = prices.PEPE;
    }

    if (prices.RUNE) {
      cachedRunePrices.coingecko = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinGecko price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.coingecko,
      ETH: cachedEthPrices.coingecko,
      TOPIA: cachedTopiaPrices.coingecko,
      PEPE: cachedPepePrices.coingecko,
      RUNE: cachedRunePrices.coingecko,
    };
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

    if (prices.ETH) {
      cachedEthPrices.cmc = prices.ETH;
    }

    if (prices.TOPIA) {
      cachedTopiaPrices.cmc = prices.TOPIA;
    }

    if (prices.PEPE) {
      cachedPepePrices.cmc = prices.PEPE;
    }

    if (prices.RUNE) {
      cachedRunePrices.cmc = prices.RUNE;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinMarketCap price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.cmc,
      ETH: cachedEthPrices.cmc,
      TOPIA: cachedTopiaPrices.cmc,
      PEPE: cachedPepePrices.cmc,
      RUNE: cachedRunePrices.cmc,
    };
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

module.exports = [
  getCoincapPrice,
  getMessariBtcPrice,
  getMessariEthPrice,
  getMessariTopiaPrice,
  getMessariPndcPrice,
  getMessariPepePrice,
  getCoinGeckoPrice,
  getCmcPrice,
  getCoinbasePrice
];
