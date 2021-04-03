module.exports = {
  round: (num) => num.toFixed(2),
  ceil: (num) => Math.ceil(num).toString(),
  average: (array) => array.reduce((a, b) => a + b) / array.length,
};