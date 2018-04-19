import axios from 'axios';
import { FETCH_ORDER } from './types';
import _ from 'lodash';
import config from '../config';
import Helpers from '../helpers';


export function errorAlert(payload) {
	return {
		type: 'ERROR_ALERT',
		payload: payload
	}
}

export function setWallet(payload) {
	return {
		type: 'SET_WALLET',
		payload: payload
	}
}

export function selectCoin(payload) {
	return (dispatch, getState) => {
		dispatch({ type: 'COIN_SELECTED', payload: payload });

  	dispatch({type: 'SET_WALLET', payload: {
  		address: '',
  		valid: false,
  		show: false
  	}});
	}
}

export function fetchCoinDetails(payload) {
	const url = `${config.API_BASE_URL}/currency/`;
	const request = axios.get(url);
	const isWhiteLabel = config.REFERRAL_CODE && config.REFERRAL_CODE.length > 0;

  return (dispatch, getState) => {
    request
      .then(response => {
      	if (!response.data.length) return;

      	let params = Helpers.urlParams(),
      		coins;

      	if (params && params.hasOwnProperty('test')) {
					coins = _.filter(response.data, {has_enabled_pairs_for_test: true});
      	} else if(isWhiteLabel){
					coins = _.filter(response.data, {has_enabled_pairs: true, is_crypto: true});
        } else {
          coins = _.filter(response.data, {has_enabled_pairs: true});
        }

      	dispatch({type: 'COINS_INFO', payload: coins});
      }).catch(error => {
      	console.log(error);
      });
  };
}

export function fetchPrice(payload) {
  let url = `${config.API_BASE_URL}/get_price/${payload.pair}/?`;

  if (payload.deposit) {
    url += `amount_quote=${payload.deposit}`;
  } else if (payload.receive) {
    url += `amount_base=${payload.receive}`;
  }

	const request = axios.get(url);

  return (dispatch, getState) => {
    request
      .then(response => {
        let data = {
          pair: payload.pair
        };

        if ('receive' in payload) {
          data['deposit'] = response.data.amount_quote;
          data['receive'] = payload.receive;
          data['lastEdited'] = 'receive';
        } else if ('deposit' in payload) {
          data['deposit'] = payload.deposit;
          data['receive'] = response.data.amount_base;
          data['lastEdited'] = 'deposit';
        } else {
          data['deposit'] = response.data.amount_quote;
          data['receive'] = response.data.amount_base;
          data['lastEdited'] = payload.lastEdited;
        }

      	dispatch({type: 'PRICE_FETCHED', payload: data});

        dispatch({type: 'ERROR_ALERT', payload: {
					show: false,
					type: 'INVALID_AMOUNT'
				}});
      }).catch(error => {
        let data = {
        	pair: payload.pair
        }

        if ('receive' in payload) {
          data['deposit'] = '...';
          data['receive'] = payload.receive;
          data['lastEdited'] = 'receive';
        } else if ('deposit' in payload) {
          data['deposit'] = payload.deposit;
          data['receive'] = '...';
          data['lastEdited'] = 'deposit';
        }

        dispatch({type: 'PRICE_FETCHED', payload: data});

        let regex = /[^[\']+(?=')/g;
        let match = regex.exec(error.response.data.detail);

        if (match && match.length) {
          dispatch({type: 'ERROR_ALERT', payload: {
  					message: match[0],
  					show: true,
  					type: 'INVALID_AMOUNT'
  				}});
        }
      });
  };
}

export function fetchPairs(payload) {
	const url = `${config.API_BASE_URL}/pair/`;
	const request = axios.get(url);

  return (dispatch, getState) => {
    request
      .then(response => {
      	if (!response.data.length) return;

        let pairs = {};
        for (let pair of response.data) {
          if (!pairs[pair.quote]) pairs[pair.quote] = {};
          pairs[pair.quote][pair.base] = !pair.disabled; // pair[deposit][receive]
        }

      	dispatch({type: 'PAIRS_FETCHED', payload: pairs});

        let depositCoin, receiveCoin;

        function pickRandomCoins(coins) {
	  let params = Helpers.urlParams();
	  if (params && params.hasOwnProperty('pair')){
          depositCoin = params['pair'].substring(0,3);
          receiveCoin = params['pair'].substring(4,7);
        } else {
	  // Picks random deposit and receive coins.
	  depositCoin = coins[Math.floor(Math.random()*coins.length)].code;
	  receiveCoin = pickRandomReceiveCoin(pairs[depositCoin]);
        }


          // If pair is invalid, try again until valid
          if (!_.filter(coins, {code: receiveCoin, is_base_of_enabled_pair: true }).length || pairs[depositCoin][receiveCoin] === false) {
            pickRandomCoins(coins);
          }
        }
        pickRandomCoins(payload);

        function pickRandomReceiveCoin(coins) {
          let objKeys = Object.keys(coins),
            randomCoin = objKeys[Math.floor(Math.random() * objKeys.length)];

          return randomCoin;
        }

				dispatch({type: 'COIN_SELECTED',
					payload: {
						deposit: depositCoin,
						receive: receiveCoin,
						prev: {
							deposit: depositCoin,
							receive: receiveCoin,
						},
						lastSelected: 'deposit'
					}
				});
      }).catch(error => {
      	console.log(error);
      });
  };
}

export const fetchOrder = orderId => async dispatch => {
	const url = `${config.API_BASE_URL}/orders/${orderId}/?_=${Math.round((new Date()).getTime())}`;
  const request = axios.get(url);

  request
    .then(res => {
      const order = res.data;
      dispatch({ type: FETCH_ORDER, payload: order });
    })
    .catch(error => {
      console.log(error)

      if (error.response && error.response.status === 429) {
        dispatch({ type: FETCH_ORDER, payload: 429 });
      } else if (error.response) {
        dispatch({ type: FETCH_ORDER, payload: 404 });
      }
    });
}
