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
  COIN_CAP_DATA_URL: 'https://api.coincap.io/v2/assets?ids=bitcoin,thorchain',
  MESSARI_BTC_DATA_URL: 'https://data.messari.io/api/v1/assets/bitcoin/metrics?fields=market_data/price_usd',
  MESSARI_RUNE_DATA_URL: 'https://data.messari.io/api/v1/assets/rune/metrics?fields=market_data/price_usd',
  NOMICS_DATA_URL: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,RUNE,ETH&convert=USD`,
  COINBASE_DATA_URL: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
  CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,4157&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  COIN_GECKO_DATA_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
};
