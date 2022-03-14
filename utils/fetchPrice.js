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
  MESSARI_WRLD_DATA_URL,
  COIN_CAP_DATA_URL,
  MESSARI_LUNA_DATA_URL,
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
const cachedWrldPrices = {
  nomics: 0,
  cmc: 0,
  coingecko: 0,
  messari: 0,
  coincap: 0,
};
const cachedLunaPrices = {
  nomics: 0,
  cmc: 0,
  coingecko: 0,
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

    if (prices.WRLD) {
      cachedWrldPrices.coincap = prices.WRLD;
    }

    if (prices.LUNA) {
      cachedLunaPrices.coincap = prices.LUNA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coincap price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.coincap,
      WRLD: cachedWrldPrices.coincap,
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

async function getMessariWrldPrice() {
  try {
    const resp = await fetch(MESSARI_WRLD_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'WRLD');

    if (prices.WRLD) {
      cachedWrldPrices.messari = prices.WRLD;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari WRLD price data: ', e);
    // use cached prices instead
    return { WRLD: cachedWrldPrices.messari };
  }
}

async function getMessariLunaPrice() {
  try {
    const resp = await fetch(MESSARI_LUNA_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data, 'LUNA');

    if (prices.LUNA) {
      cachedWrldPrices.messari = prices.LUNA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari LUNA price data: ', e);
    // use cached prices instead
    return { LUNA: cachedLunaPrices.messari };
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

    if (prices.WRLD) {
      cachedWrldPrices.coingecko = prices.WRLD;
    }

    if (prices.LUNA) {
      cachedLunaPrices.coingecko = prices.LUNA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinGecko price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.coingecko,
      WRLD: cachedWrldPrices.coingecko,
      LUNA: cachedLunaPrices.coingecko,
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

    if (prices.WRLD) {
      cachedWrldPrices.cmc = prices.WRLD;
    }

    if (prices.LUNA) {
      cachedLunaPrices.cmc = prices.LUNA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinMarketCap price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.cmc,
      WRLD: cachedWrldPrices.cmc,
      LUNA: cachedLunaPrices.cmc,
    };
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

    if (prices.WRLD) {
      cachedWrldPrices.nomics = prices.WRLD;
    }

    if (prices.LUNA) {
      cachedLunaPrices.nomics = prices.LUNA;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Nomics price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.nomics,
      WRLD: cachedWrldPrices.nomics,
      LUNA: cachedLunaPrices.nomics,
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
  getMessariWrldPrice,
  getMessariLunaPrice,
  getCoinGeckoPrice,
  getCmcPrice,
  getNomicsPrice,
  getCoinbasePrice
];
