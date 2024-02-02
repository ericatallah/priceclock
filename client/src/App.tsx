import React, { useEffect, useState } from 'react';
import './App.css';
import useInterval from 'react-useinterval';

type ClockDigit = undefined | string;

const CLOCK_DIGITS = 7; 
const PRICE_REFRESH_INTERVAL = 360;
const ONE_BIL = 1_000_000_000;

function App() {
  const [btc, setBtc] = useState('0');
  const [eth, setEth] = useState('0');
  const [xrp, setXrp] = useState('0');
  const [topia, setTopia] = useState('0');
  const [rune, setRune] = useState('0');
  const [pndc, setPndc] = useState('0');
  const [pork, setPork] = useState('0');

  async function fetchPrices() {
    const resp = await fetch('http://localhost:5000/prices');
    const prices = await resp.json();
    return prices;
  }

  async function updatePrices() {
    const { BTC, ETH, XRP, TOPIA, RUNE, PNDC, PORK } = await fetchPrices();
    setBtc(BTC);
    setEth(ETH);
    setXrp(XRP);
    setTopia(TOPIA);
    setRune(RUNE);
    setPndc(PNDC);
    setPork(PORK);
  }

  function setPriceClock(price: string) {
    const digits = addNullEntries(price.split(''));
    return digits.map((num: ClockDigit, idx: number) => {
      return <div className="digit" key={`${idx}-${num}`}>{num || '-'}</div>
    })
  }

  function getNullArray(length: number): undefined[] {
    const arr: undefined[] = [];
    arr.length = length > 0 ? length : 0;
    return arr;
  }

  function addNullEntries(digits: string[]): ClockDigit[] {
    const nullArray = getNullArray(CLOCK_DIGITS - digits.length);
    return [...nullArray, ...digits];
  }

  useEffect(() => {
    updatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useInterval(updatePrices, PRICE_REFRESH_INTERVAL * 1000);

  return (
    <div id="app">
      <div id="center">
        <div id="clock">
          <div className="flex">
            {setPriceClock(btc)}
          </div>
          <div className="small-price-container">
            <div id="eth" className="small-price">Eth {eth}</div>
            {/* <h2><span>BITCLOCK</span></h2> */}
            <div id="rune" className="small-price">RUNE {rune}</div>
            <div id="topia" className="small-price">TOP {topia}</div>
          </div>
          <div className="small-price-container">
            <div id="pndc" className="small-price">1 B PNDC = {((+pndc * ONE_BIL) / +eth).toFixed(2)} ETH</div>
            <div id="pork" className="small-price">1 B PORK = {((+pork * ONE_BIL) / +eth).toFixed(2)} ETH</div>
          </div>
          <div className="small-price-container">
            <div id="xrp" className="small-price">XRP {xrp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
