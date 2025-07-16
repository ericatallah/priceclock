require('dotenv').config();
const fetch = require('node-fetch');
const {
  parseMessariPrices,
  parseCmcPrices,
  parseCbPrices,
  parseCoinGeckoPrices,
  parseCoincapPrices,
  parseMSTRPrices,
} = require('./priceParser');
const {
  CMC_DATA_URL,
  COIN_GECKO_DATA_URL,
  COIN_CAP_DATA_URL,
  MESSARI_DATA_URL,
  COINBASE_BTC_DATA_URL,
  COINBASE_ETH_DATA_URL,
  COINBASE_XRP_DATA_URL,
  MSTR_DATA_URL,
  COINBASE_SOL_DATA_URL,
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
const cachedSolPrices = {
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
const cachedAi16zPrices = {
  cmc: 0,
  coingecko: 0,
  messari: 0,
};
const cachedMSTRPrices = {
  // av: 0,
  rh: 0,
};

async function getCoincapPrice() {
  try {
    const resp = await fetch(COIN_CAP_DATA_URL, {
      method: 'GET',
      // headers: {
      //   'Authorization': `Bearer ${process.env.COINCAP_KEY}`,
      //   'Accept-Encoding': 'gzip',
      // }
    });
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

    if (prices.SOL) {
      cachedSolPrices.coincap = prices.SOL;
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
      SOL: cachedSolPrices.coincap,
    };
  }
}

async function getMessariPrices() {
  try {
    const resp = await fetch(MESSARI_DATA_URL, {
      method: 'GET',
      headers: { 'x-messari-api-key': process.env.MESSARI_KEY }
    });
    const data = await resp.json();
    const prices = parseMessariPrices(data);

    if (prices.BTC) {
      cachedBtcPrices.messari = prices.BTC;
    }

    if (prices.ETH) {
      cachedEthPrices.messari = prices.ETH;
    }

    if (prices.XRP) {
      cachedXrpPrices.messari = prices.XRP;
    }

    if (prices.RUNE) {
      cachedRunePrices.messari = prices.RUNE;
    }

    if (prices.SOL) {
      cachedSolPrices.messari = prices.SOL;
    }

    if (prices.TOPIA) {
      cachedTopiaPrices.messari = prices.TOPIA;
    }

    if (prices.AI16Z) {
      cachedAi16zPrices.messari = prices.AI16Z;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Messari price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.messari,
      ETH: cachedEthPrices.messari,
      XRP: cachedXrpPrices.messari,
      RUNE: cachedRunePrices.messari,
      SOL: cachedSolPrices.messari,
      TOPIA: cachedTopiaPrices.messari,
      AI16Z: cachedAi16zPrices.messari,
    };
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

    if (prices.SOL) {
      cachedSolPrices.coingecko = prices.SOL;
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

    if (prices.AI16Z) {
      cachedAi16zPrices.coingecko = prices.AI16Z;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinGecko price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.coingecko,
      ETH: cachedEthPrices.coingecko,
      SOL: cachedSolPrices.coingecko,
      XRP: cachedXrpPrices.coingecko,
      TOPIA: cachedTopiaPrices.coingecko,
      PORK: cachedPorkPrices.coingecko,
      RUNE: cachedRunePrices.coingecko,
      AI16Z: cachedAi16zPrices.coingecko,
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

    if (prices.SOL) {
      cachedSolPrices.cmc = prices.SOL;
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

    if (prices.AI16Z) {
      cachedAi16zPrices.cmc = prices.AI16Z;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving CoinMarketCap price data: ', e);
    // use cached prices instead
    return {
      BTC: cachedBtcPrices.cmc,
      ETH: cachedEthPrices.cmc,
      SOL: cachedSolPrices.cmc,
      XRP: cachedXrpPrices.cmc,
      TOPIA: cachedTopiaPrices.cmc,
      PORK: cachedPorkPrices.cmc,
      RUNE: cachedRunePrices.cmc,
      AI16Z: cachedAi16zPrices.coingecko,
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

async function getCoinbaseSolPrice() {
  try {
    const resp = await fetch(COINBASE_SOL_DATA_URL);
    const data = await resp.json();
    const prices = parseCbPrices(data, 'SOL');

    if (prices.SOL) {
      cachedSolPrices.coinbase = prices.SOL;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving Coinbase SOL price data: ', e);
    // use cached price instead
    return { SOL: cachedSolPrices.coinbase };
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

async function getMSTRPrice() {
  try {
    // only fetch if markets are open (mon - fri 6:30am - 1pm PT)
    const now = new Date();
    const minutes = now.getMinutes();
    const hour = now.getHours();
    const day = now.getDay();


    if ([0, 6].includes(day)) {
      // markets closed sat/sun
      return {
        MSTR: cachedMSTRPrices.av,
      };
    }

    if ([0, 1, 2, 3, 4, 5, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].includes(hour)) {
      // markets closed outside hrs of 6:30am - 1pm PT
      return {
        MSTR: cachedMSTRPrices.av,
      };
    }

    if (hour === 6 && minutes < 30) {
      // markets closed before 6:30am PT
      return {
        MSTR: cachedMSTRPrices.av,
      };
    }

    if (hour === 13 && minutes > 10) {
      // markets closed after 1pm PT (go until 10 mins after to make sure we get stock closing price)
      return {
        MSTR: cachedMSTRPrices.av,
      };
    }

    const resp = await fetch(MSTR_DATA_URL);
    const data = await resp.json();
    const prices = parseMSTRPrices(data);

    if (prices.MSTR) {
      cachedMSTRPrices.av = prices.MSTR;
    }

    return prices;
  } catch (e) {
    console.log('Error retrieving fin prep MSTR price data: ', e);
    // use cached prices instead
    return {
      MSTR: cachedMSTRPrices.av,
    };
  }
}

// not working
async function getRobinhoodMSTRPrice() {
  try {
    // const { data } = await axios.get('https://robinhood.com/stocks/MSTR/');
    const resp = await fetch('https://robinhood.com/stocks/MSTR/');
    const data = await resp.text();
    console.log(data);
    const regex = /"bid_price":"(\d+\.\d{1,6})"/;
    const match = data.match(regex);

    if (!match) {
      return {
        MSTR: cachedMSTRPrices.rh,
      };
    }

    const priceNum = parseFloat(match[1]).toFixed(2);
    console.log('rh mstr price: ', priceNum);

    if (priceNum > 0) {
      cachedMSTRPrices.rh = priceNum;
    }

    return { MSTR: priceNum };
  } catch (e) {
    console.log('Error retrieving robinhood MSTR price data: ', e);
    // use cached prices instead
    return {
      MSTR: cachedMSTRPrices.rh,
    };
  }
}

module.exports = [
  getCoincapPrice,
  getMessariPrices,
  getCoinGeckoPrice,
  getCmcPrice,
  getCoinbaseBtcPrice,
  getCoinbaseEthPrice,
  getCoinbaseSolPrice,
  getCoinbaseXrpPrice,
  getMSTRPrice,
  // getRobinhoodMSTRPrice,
];
