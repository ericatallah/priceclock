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
  CMC_DATA_URL,
  COIN_GECKO_DATA_URL,
  MESSARI_BTC_DATA_URL,
  MESSARI_HYTOPIA_DATA_URL,
  COIN_CAP_DATA_URL,
  MESSARI_ETH_DATA_URL,
  MESSARI_PNDC_DATA_URL,
  MESSARI_RUNE_DATA_URL,
  MESSARI_PORK_DATA_URL,
  MESSARI_XRP_DATA_URL,
  COINBASE_BTC_DATA_URL,
  COINBASE_ETH_DATA_URL,
  COINBASE_XRP_DATA_URL,
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
  coinbase: 0,
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedXrpPrices = {
  coinbase: 0,
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
const cachedPorkPrices = {
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

    if (prices.XRP) {
      cachedXrpPrices.coincap = prices.XRP;
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
      ETH: cachedEthPrices.coincap,
      XRP: cachedXrpPrices.coincap,
      RUNE: cachedRunePrices.coincap,
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

async function getMessariXrpPrice() {
  try {
    const resp = await fetch(MESSARI_XRP_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'XRP');

    if (prices.XRP) {
      cachedXrpPrices.messari = prices.XRP;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari XRP price data: ', e);
    // use cached prices instead
    return { XRP: cachedXrpPrices.messari };
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

async function getMessariPorkPrice() {
  try {
    const resp = await fetch(MESSARI_PORK_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'PORK');

    if (prices.PORK) {
      cachedPorkPrices.messari = prices.PORK;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari PORK price data: ', e);
    // use cached prices instead
    return { PORK: cachedPorkPrices.messari };
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

    if (prices.XRP) {
      cachedXrpPrices.coingecko = prices.XRP;
    }

    if (prices.TOPIA) {
      cachedTopiaPrices.coingecko = prices.TOPIA;
    }

    if (prices.PORK) {
      cachedPorkPrices.coingecko = prices.PORK;
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
      XRP: cachedXrpPrices.coingecko,
      TOPIA: cachedTopiaPrices.coingecko,
      PORK: cachedPorkPrices.coingecko,
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

    if (prices.XRP) {
      cachedXrpPrices.cmc = prices.XRP;
    }

    if (prices.TOPIA) {
      cachedTopiaPrices.cmc = prices.TOPIA;
    }

    if (prices.PORK) {
      cachedPorkPrices.cmc = prices.PORK;
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
      XRP: cachedXrpPrices.cmc,
      TOPIA: cachedTopiaPrices.cmc,
      PORK: cachedPorkPrices.cmc,
      RUNE: cachedRunePrices.cmc,
    };
  }
}

async function getCoinbaseBtcPrice() {
  try {
    const resp = await fetch(COINBASE_BTC_DATA_URL);
    const data = await resp.json();
    const prices = parseCbPrices(data, 'BTC');

    if (prices.BTC) {
      cachedBtcPrices.coinbase = prices.BTC;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coinbase BTC price data: ', e);
    // use cached price instead
    return { BTC: cachedBtcPrices.coinbase };
  }
}

async function getCoinbaseEthPrice() {
  try {
    const resp = await fetch(COINBASE_ETH_DATA_URL);
    const data = await resp.json();
    const prices = parseCbPrices(data, 'ETH');

    if (prices.ETH) {
      cachedEthPrices.coinbase = prices.ETH;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coinbase ETH price data: ', e);
    // use cached price instead
    return { ETH: cachedEthPrices.coinbase };
  }
}

async function getCoinbaseXrpPrice() {
  try {
    const resp = await fetch(COINBASE_XRP_DATA_URL);
    const data = await resp.json();
    const prices = parseCbPrices(data, 'XRP');

    if (prices.XRP) {
      cachedXrpPrices.coinbase = prices.XRP;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coinbase XRP price data: ', e);
    // use cached price instead
    return { XRP: cachedXrpPrices.coinbase };
  }
}

module.exports = [
  getCoincapPrice,
  getMessariBtcPrice,
  getMessariEthPrice,
  getMessariTopiaPrice,
  getMessariRunePrice,
  getMessariPndcPrice,
  getMessariPorkPrice,
  getMessariXrpPrice,
  getCoinGeckoPrice,
  getCmcPrice,
  getCoinbaseBtcPrice,
  getCoinbaseEthPrice,
  getCoinbaseXrpPrice,
];
