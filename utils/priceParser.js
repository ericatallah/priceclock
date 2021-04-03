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
  parseCoinGeckoPrices: (json) => json && json.bitcoin && { BTC: +json.bitcoin.usd },
};