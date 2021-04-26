import axios from 'axios';
import config from 'Config';

// Picks random deposit and receive coins.
export default async ({ base, quote }, params) => {
  // Checks if url has params. If yes then update accordingly and if no then pick random coins.
  let response;
  if (base && quote) {
    response = await loadPair(`${base}${quote}`, pairs).catch(console.error);
  } else if (params && params.hasOwnProperty('pair')) {
    response = await loadPair(params.pair).catch(console.error);
  } else {
    response = await mostTradedPair().catch(console.error);
  }
  return response.data;
};

const mostTradedPair = () => axios.get(`${config.API_BASE_URL}/pair/most_traded/`);
const loadPair = pair => axios.get(`${config.API_BASE_URL}/pair/${pair.toUpperCase()}/`);
