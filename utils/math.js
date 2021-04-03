module.exports = {
  round: (num) => num.toFixed(2),
  ceil: (num) => num.toFixed(0),
  average: (array) => array.reduce((a, b) => a + b) / array.length,
};