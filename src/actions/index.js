import axios from 'axios';
import * as types from './types';
import _ from 'lodash';
import config from '../config';
import urlParams from '../helpers/urlParams';
import preparePairs from '../helpers/preparePairs';

export const errorAlert = payload => ({
  type: types.ERROR_ALERT,
  payload,
});

export const setWallet = payload => ({
  type: types.SET_WALLET,
  payload,
});

export const selectCoin = payload => dispatch => {
  dispatch({ type: types.COIN_SELECTED, payload });

  dispatch(
    setWallet({
      address: '',
      valid: false,
      show: false,
    })
  );
};

export const fetchCoinDetails = payload => dispatch => {
  const url = `${config.API_BASE_URL}/currency/`;
  const request = axios.get(url);
  const isWhiteLabel = config.REFERRAL_CODE && config.REFERRAL_CODE.length > 0;

  return request
    .then(response => {
      if (!response.data.length) return;

      const params = urlParams();
      let coins;

      if (params && params.hasOwnProperty('test')) {
        coins = _.filter(response.data, { has_enabled_pairs_for_test: true });
      } else if (isWhiteLabel) {
        coins = _.filter(response.data, {
          has_enabled_pairs: true,
          is_crypto: true,
        });
      } else {
        coins = _.filter(response.data, { has_enabled_pairs: true });
      }

      dispatch({ type: types.COINS_INFO, payload: coins });
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchPrice = payload => dispatch => {
  let url = `${config.API_BASE_URL}/get_price/${payload.pair}/?`;

  if (payload.deposit) {
    url += `amount_quote=${payload.deposit}`;
  } else if (payload.receive) {
    url += `amount_base=${payload.receive}`;
  }

  const request = axios.get(url);

  return request
    .then(response => {
      let data = {
        pair: payload.pair,
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

      dispatch({ type: types.PRICE_FETCHED, payload: data });

      dispatch({
        type: types.ERROR_ALERT,
        payload: {
          show: false,
          type: types.INVALID_AMOUNT,
        },
      });
    })
    .catch(error => {
      let data = { pair: payload.pair };

      if ('receive' in payload) {
        data['deposit'] = '...';
        data['receive'] = payload.receive;
        data['lastEdited'] = 'receive';
      } else if ('deposit' in payload) {
        data['deposit'] = payload.deposit;
        data['receive'] = '...';
        data['lastEdited'] = 'deposit';
      }

      dispatch({ type: types.PRICE_FETCHED, payload: data });

      if (error.response && error.response.data) {
        dispatch(
          errorAlert({
            message: error.response.data.detail,
            show: true,
            type: types.INVALID_AMOUNT,
          })
        );
      }
    });
};

export const fetchPairs = payload => {
  const url = `${config.API_BASE_URL}/pair/`;
  const request = axios.get(url);

  return (dispatch, getState) => {
    request
      .then(response => {
        if (!response.data.length) return;

        const pairs = preparePairs(response.data);

        dispatch({ type: types.PAIRS_FETCHED, payload: pairs });

        let depositCoin, receiveCoin;

        const pickRandomReceiveCoin = coins => {
          let objKeys = Object.keys(coins),
            randomCoin = objKeys[Math.floor(Math.random() * objKeys.length)];

          return randomCoin;
        };

        // Picks random deposit and receive coins.
        const pickRandomCoins = coins => {
          depositCoin = coins[Math.floor(Math.random() * coins.length)].code;
          receiveCoin = pickRandomReceiveCoin(pairs[depositCoin]);

          // If pair is invalid, try again until valid
          if (
            !_.filter(coins, {
              code: receiveCoin,
              is_base_of_enabled_pair: true,
            }).length ||
            pairs[depositCoin][receiveCoin] === false
          ) {
            pickRandomCoins(coins);
          }
        };
        pickRandomCoins(payload);

        dispatch(
          selectCoin({
            deposit: depositCoin,
            receive: receiveCoin,
            prev: {
              deposit: depositCoin,
              receive: receiveCoin,
            },
            lastSelected: 'deposit',
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setOrder = order => ({
  type: types.SET_ORDER,
  order,
});

export const fetchOrder = orderId => async dispatch => {
  const url = `${config.API_BASE_URL}/orders/${orderId}/`;
  const request = axios.get(url);

  return request
    .then(res => {
      const order = res.data;
      dispatch(setOrder(order));
    })
    .catch(error => {
      if (error.response && error.response.status === 429) {
        dispatch(setOrder(429));
      } else if (error.response) {
        dispatch(setOrder(404));
      }
    });
};

export const fetchKyc = orderId => async dispatch => {
  const url = `${config.API_BASE_URL}/kyc/${orderId}/`;
  const request = axios.get(url);

  return request.then(res => dispatch({ type: types.SET_KYC, kyc: res.data })).catch(error => {});
};

export const fetchUserEmail = () => async dispatch => {
  if (!localStorage.token) return;

  const url = `${config.API_BASE_URL}/users/me/`;
  const request = axios.get(url);

  return request.then(res => dispatch({ type: types.SET_EMAIL, value: res.data.email }));
};

export const setUserEmail = email => async dispatch => {
  if (!localStorage.token) return;

  const url = `${config.API_BASE_URL}/users/me/`;
  const request = axios.put(url, { email });

  return request
    .then(res => {
      if (!window.$crisp.get('user:email')) {
        window.$crisp.push(['set', 'user:email', [email]]);
      }

      dispatch({
        type: types.SET_EMAIL_AND_MESSAGE,
        value: res.data.email,
        message: {
          text: 'Success, you set your email.',
          error: false,
        },
      });
    })
    .catch(error => {
      let errorMessage = 'Something went wrong. Try again later.';

      if (error.response && error.response.data && error.response.data.email.length && error.response.data.email[0]) {
        errorMessage = error.response.data.email[0];
      }

      dispatch({
        type: types.SET_EMAIL_AND_MESSAGE,
        value: '',
        message: {
          text: errorMessage,
          error: true,
        },
      });
    });
};
