window.onload = () => {
  const btc = document.getElementById("btc");
  const rune = document.getElementById("rune");

  async function showPrices() {
    const resp = await fetch("/prices");
    const { BTC, RUNE } = await resp.json();
    btc.innerHTML = BTC;
    rune.innerHTML = RUNE;
  }
  showPrices();
  setInterval(showPrices, 30000);
};

