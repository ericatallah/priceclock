module.exports = {
  round: (num, precision = 2) => num.toFixed(precision),
  ceil: (num) => Math.ceil(num).toString(),
  average: (array) => array.reduce((a, b) => a + b, 0) / array.length,
};