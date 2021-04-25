import axios from 'axios';
import config from 'Config';

// Picks random deposit and receive coins.
export const pickedCoinsPair = async (base, quote, params, pairs) => {
  // Checks if url has params. If yes then update accordingly and if no then pick random coins.
  if (base && quote) {
    try {
      const pair = await loadPair(`${base}${quote}`, pairs);
      if (pair) {
        return { depositCoin: pair.quote, receiveCoin: pair.base };
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error:', err);
    }
  } else if (params && params.hasOwnProperty('pair')) {
    try {
      const pair = await loadPair(params.pair, pairs);
      if (pair) {
        return pair;
      }
    } catch (err) {
      /* istanbul ignore next */
      console.log('Error:', err);
    }
  } else {
    const pair = await mostTradedPair();
    if (pair) {
      return pair;
    } else {
      return randomPair(pairs);
    }
  }
};

export const mostTradedPair = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${config.API_BASE_URL}/pair/most_traded/`)
      .then(res => resolve(res.data))
      .catch(err => resolve(null));
  });

const loadPair = (pair, pairs) => {
  const url = `${config.API_BASE_URL}/pair/${pair.toUpperCase()}/`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res.data))
      .catch(err => {
        resolve(randomPair(pairs));
      });
  });
};

const randomPair = pairs => pairs[Math.floor(Math.random() * pairs.length)];
