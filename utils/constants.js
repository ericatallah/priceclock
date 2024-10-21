require("dotenv").config();

const CMC_ID_TICKER_MAP = {
  'BTC': 1,
  'WRLD': 4157,
  'LUNA': 4172,
  'ETH': 1027,
  'SOL': 5426,
  'ADA': 2010,
  'DOT': 6636,
  'SNX': 2586,
  'GRT': 6719,
  'LINK': 1975,
  'HEX': 5015,
  'HNT': 5665,
  'RAZE': 9173,
  'EFI': 8985,
};

module.exports = {
  COIN_CAP_DATA_URL: 'https://api.coincap.io/v2/assets?ids=bitcoin,thorchain,ethereum,xrp',
  MESSARI_BTC_DATA_URL: 'https://data.messari.io/api/v1/assets/bitcoin/metrics?fields=market_data/price_usd',
  MESSARI_ETH_DATA_URL: 'https://data.messari.io/api/v1/assets/ethereum/metrics?fields=market_data/price_usd',
  MESSARI_HYTOPIA_DATA_URL: 'https://data.messari.io/api/v1/assets/hytopia/metrics?fields=market_data/price_usd',
  MESSARI_PNDC_DATA_URL: 'https://data.messari.io/api/v1/assets/pndc/metrics?fields=market_data/price_usd',
  MESSARI_RUNE_DATA_URL: 'https://data.messari.io/api/v1/assets/thorchain/metrics?fields=market_data/price_usd',
  MESSARI_PORK_DATA_URL: 'https://data.messari.io/api/v1/assets/pepefork/metrics?fields=market_data/price_usd',
  MESSARI_XRP_DATA_URL: 'https://data.messari.io/api/v1/assets/xrp/metrics?fields=market_data/price_usd',
  // nomics dead
  //NOMICS_DATA_URL: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,WRLD,ETH,LUNA&convert=USD`,
  COINBASE_BTC_DATA_URL: 'https://api.coinbase.com/v2/prices/BTC-USD/buy',
  COINBASE_ETH_DATA_URL: 'https://api.coinbase.com/v2/prices/ETH-USD/buy',
  COINBASE_XRP_DATA_URL: 'https://api.coinbase.com/v2/prices/XRP-USD/buy',
  COIN_GECKO_DATA_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,thorchain,hytopia,pepefork&vs_currencies=usd',
  // CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${CMC_ID_TICKER_MAP.BTC},${CMC_ID_TICKER_MAP.WRLD},${CMC_ID_TICKER_MAP.LUNA}&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,XRP,RUNE,TOPIA,PNDC,PORK&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  MSTR_DATA_URL: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSTR&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
};
