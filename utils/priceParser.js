module.exports = {
  parseCbPrices: (json, symbol) => json && json.data && { [symbol]: +json.data.amount },
  parseCmcPrices: (json) => {
    const prices = {};
    Object.keys(json.data).forEach((key) => {
      const item = json.data[key];
      prices[item.symbol] = item.quote && item.quote.USD && +item.quote.USD.price;
    });

    return prices;
  },
  parseCoinGeckoPrices: (json) => {
    const prices = {};
    Object.keys(json).forEach((symbol) => {
      if (symbol === 'bitcoin') prices.BTC = json[symbol].usd;
      else if (symbol === 'ethereum') prices.ETH = json[symbol].usd;
      else if (symbol === 'ripple') prices.XRP = json[symbol].usd;
      else if (symbol === 'hytopia') prices.TOPIA = json[symbol].usd;
      else if (symbol === 'pepefork') prices.PORK = json[symbol].usd;
      else if (symbol === 'thorchain') prices.RUNE = json[symbol].usd;
      else prices[symbol] = json[symbol].usd;
    });
    return prices;
  },
  parseMessariPrices: (json, symbol) => json && json.data && json.data.market_data && { [symbol]: +json.data.market_data.price_usd },
  parseCoincapPrices: (json) => {
    const prices = {};
    json.data.forEach((item) => {
      prices[item.symbol] = +item.priceUsd;
    });

    return prices;
  },
  parseMSTRPrices: (json) => {
    const price = +json['Global Quote']['05. price'];
    return { MSTR: price };
  },
};