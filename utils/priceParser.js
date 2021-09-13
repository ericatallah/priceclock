module.exports = {
  parseCbPrices: (json) => json && json.data && { BTC: +json.data.amount },
  parseNomicsPrices: (json) => {
    const prices = {};
    json.forEach((item) => {
      prices[item.id] = +item.price;
    });

    return prices;
  },
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
      else if (symbol === 'thorchain') prices.RUNE = json[symbol].usd;
      else if (symbol === 'terra-luna') prices.LUNA = json[symbol].usd;
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
};