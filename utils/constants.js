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
  COIN_CAP_DATA_URL: `https://rest.coincap.io/v3/assets?ids=bitcoin,thorchain,ethereum,xrp,solana&apiKey=${process.env.COINCAP_KEY}`,
  MESSARI_DATA_URL: 'https://api.messari.io/metrics/v2/assets/details?slugs=bitcoin,ethereum,solana,hytopia,thorchain,xrp,ai16z',
  COINBASE_BTC_DATA_URL: 'https://api.coinbase.com/v2/prices/BTC-USD/buy',
  COINBASE_ETH_DATA_URL: 'https://api.coinbase.com/v2/prices/ETH-USD/buy',
  COINBASE_SOL_DATA_URL: 'https://api.coinbase.com/v2/prices/SOL-USD/buy',
  COINBASE_XRP_DATA_URL: 'https://api.coinbase.com/v2/prices/XRP-USD/buy',
  COIN_GECKO_DATA_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,thorchain,hytopia,pepefork,solana,ai16z&vs_currencies=usd',
  // CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${CMC_ID_TICKER_MAP.BTC},${CMC_ID_TICKER_MAP.WRLD},${CMC_ID_TICKER_MAP.LUNA}&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  CMC_DATA_URL: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,XRP,RUNE,TOPIA,PNDC,PORK,SOL,AI16Z&CMC_PRO_API_KEY=${process.env.CMC_KEY}`,
  // MSTR_DATA_URL: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSTR&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
  MSTR_DATA_URL: `https://financialmodelingprep.com/api/v3/quote-short/MSTR?apikey=${process.env.FIN_MODEL_PREP_API_KEY}`,
};
