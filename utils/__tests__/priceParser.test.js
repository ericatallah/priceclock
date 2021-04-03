const { TestScheduler } = require('jest');
const { parseCbPrices, parseNomicsPrices, parseCmcPrices } = require('../priceParser');

test('should parse price data from cb', () => {
  const cbData = {
    data: {
      amount: 150000
    }
  };

  expect(parseCbPrices(cbData)).toBe(150000);
});

const result = { BTC: 150000, RUNE: 150 };

test('should parse price data from nomics', () => {
  const nomicsData = [
    { id: 'BTC', price: 150000 },
    { id: 'RUNE', price: 150 },
  ];

  expect(parseNomicsPrices(nomicsData)).toStrictEqual(result);
});

test('should parse price data from cmc', () => {
  const cmcData = {
    data: {
      1: { symbol: 'BTC', quote: { USD: { price: 150000 } } },
      2: { symbol: 'RUNE', quote: { USD: { price: 150 } } },
    }
  };

  expect(parseCmcPrices(cmcData)).toStrictEqual(result);
});
