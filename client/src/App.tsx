import React, { useEffect, useState } from 'react';
import './App.css';
import useInterval from 'react-useinterval';

type ClockDigit = undefined | string;

const CLOCK_DIGITS = 7; 

function App() {
  const [btc, setBtc] = useState('0');
  const [rune, setRune] = useState('0');

  async function fetchPrices() {
    const resp = await fetch('http://localhost:5000/prices');
    const prices = await resp.json();
    return prices;
  }

  async function updatePrices() {
    const { BTC, RUNE } = await fetchPrices();
    setBtc(BTC);
    setRune(RUNE);
  }

  function setPriceClock(price: string) {
    const digits = addNullEntries(price.split(''));
    return digits.map((num: ClockDigit, idx: number) => {
      return <div className="digit" key={`${idx}-${num}`}>{num || '-'}</div>
    })
  }

  function getNullArray(length: number): undefined[] {
    const arr: undefined[] = [];
    arr.length = length;
    return arr;
  }

  function addNullEntries(digits: string[]): ClockDigit[] {
    const nullArray = getNullArray(CLOCK_DIGITS - digits.length);
    return [...nullArray, ...digits];
  }

  useEffect(() => {
    updatePrices();
  },[]);

  useInterval(updatePrices, 60000);

  return (
    <div id="app">
      <div id="center">
        <div id="clock">
          {setPriceClock(btc)}
          <h2><span>BITCLOCK</span></h2>
          <div id="rune">{rune}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
