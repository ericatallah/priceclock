require("dotenv").config();

module.exports = {
  CMC_ID_TICKER_MAP: {
    'BTC': 1,
    'RUNE': 4157,
    'ETH': 1027,
    'ADA': 2010,
    'DOT': 6636,
    'SNX': 2586,
    'GRT': 6719,
    'LINK': 1975
  },
  DATA_SOURCES: [
    { nomics: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,RUNE&convert=USD` },
    { cb: 'https://api.coinbase.com/v2/prices/spot?currency=USD' },
    { cmc: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,4157&CMC_PRO_API_KEY=${process.env.CMC_KEY}` },
  ],
  NOMICS_DATA_URL: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,RUNE&convert=USD`,
  COINBASE_DATA_URL: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
  CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,4157&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
};
