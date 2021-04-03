const { TestScheduler } = require('jest');
const { round, ceil, average } = require('../math');

test('should round number to two decimal places', () => {
  expect(round(1232.455789)).toBe('1232.46');
  expect(round(0.205789)).toBe('0.21');
  expect(round(0.204789)).toBe('0.20');
});

test('should round up to nearest whole number', () => {
  expect(ceil(1232.455789)).toBe('1233');
  expect(ceil(0.205789)).toBe('1');
  expect(ceil(23400032.204789)).toBe('23400033');
});

test('should compute average of numbers in an array', () => {
  expect(average([1, 2, 3, 4])).toBe(2.5);
  expect(average([2, 2, 2, 2])).toBe(2);
  expect(average([2, 2, 3, 3, 5, 5, 6, 6])).toBe(4);
});
