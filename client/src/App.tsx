import React, { useEffect, useState } from 'react';
import './App.css';
import useInterval from 'react-useinterval';

type ClockDigit = undefined | string;

const CLOCK_DIGITS = 7; 
const PRICE_REFRESH_INTERVAL = 360;

function App() {
  const [btc, setBtc] = useState('0');
  const [wrld, setWrld] = useState('0');
  const [luna, setLuna] = useState('0');

  async function fetchPrices() {
    const resp = await fetch('http://localhost:5000/prices');
    const prices = await resp.json();
    return prices;
  }

  async function updatePrices() {
    const { BTC, WRLD, LUNA } = await fetchPrices();
    setBtc(BTC);
    setWrld(WRLD);
    setLuna(LUNA);
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
          {setPriceClock(btc)}
          <div id="luna">{luna}</div>
          <h2><span>BITCLOCK</span></h2>
          <div id="wrld">{wrld}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
