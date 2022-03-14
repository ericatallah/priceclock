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
  COIN_CAP_DATA_URL: 'https://api.coincap.io/v2/assets?ids=bitcoin,nft-worlds,terra-luna',
  MESSARI_BTC_DATA_URL: 'https://data.messari.io/api/v1/assets/bitcoin/metrics?fields=market_data/price_usd',
  MESSARI_WRLD_DATA_URL: 'https://data.messari.io/api/v1/assets/wrld/metrics?fields=market_data/price_usd',
  MESSARI_LUNA_DATA_URL: 'https://data.messari.io/api/v1/assets/luna/metrics?fields=market_data/price_usd',
  NOMICS_DATA_URL: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_KEY}&ids=BTC,WRLD,ETH,LUNA&convert=USD`,
  COINBASE_DATA_URL: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
  // CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${CMC_ID_TICKER_MAP.BTC},${CMC_ID_TICKER_MAP.WRLD},${CMC_ID_TICKER_MAP.LUNA}&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,WRLD,LUNA&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  COIN_GECKO_DATA_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,nft-worlds,terra-luna&vs_currencies=usd',
};
