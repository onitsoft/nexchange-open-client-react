import axios from 'axios';
import * as types from './types';
import _ from 'lodash';
import config from 'Config';
import urlParams from 'Utils/urlParams';
import preparePairs from 'Utils/preparePairs';
import i18n from 'Src/i18n';

export const errorAlert = payload => ({
  type: types.ERROR_ALERT,
  payload,
});

export const setWallet = payload => ({
  type: types.SET_WALLET,
  payload,
});

export const selectCoin = selectedCoins => ({
  type: types.COIN_SELECTED,
  payload: {
    selectedCoins,
  },
});

export const fetchCoinDetails = () => dispatch => {
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
      /* istanbul ignore next */
      console.log(error);
    });
};

export const fetchPrice = payload => dispatch => {
  const pair = payload.pair;
  const lastEdited = payload.lastEdited;

  if (payload.coinSelector) {
    dispatch({ type: types.FETCHING_PRICE });
  }

  return new Promise(async (resolve, reject) => {
    const makeRequest = url => {
      return axios
        .get(url)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          throw err;
        });
    };

    const setValidValues = amounts => {
      const data = { pair };

      data['deposit'] = parseFloat(amounts.amount_quote);
      data['receive'] = parseFloat(amounts.amount_base);
      data['min_amount_quote'] = parseFloat(amounts.min_amount_quote);
      data['max_amount_quote'] = parseFloat(amounts.max_amount_quote);
      data['min_amount_base'] = parseFloat(amounts.min_amount_base);
      data['max_amount_base'] = parseFloat(amounts.max_amount_base);
      data['lastEdited'] = lastEdited;

      dispatch({ type: types.PRICE_FETCHED, payload: data });
      dispatch(errorAlert({ show: false, type: types.INVALID_AMOUNT }));

      resolve();
    };

    const setFaultyValues = err => {
      let data = { pair };

      if (err.response.data) {
        data['min_amount_quote'] = parseFloat(err.response.data.min_amount_quote);
        data['max_amount_quote'] = parseFloat(err.response.data.max_amount_quote);
        data['min_amount_base'] = parseFloat(err.response.data.min_amount_base);
        data['max_amount_base'] = parseFloat(err.response.data.max_amount_base);
      }

      /* istanbul ignore next */
      if (window.ga) {
        window.ga('send', 'event', {
          eventCategory: 'Amount input',
          eventAction: 'Amount too high/low error',
        });
      }

      if ('receive' in payload) {
        data['deposit'] = '...';
        data['receive'] = parseFloat(payload.receive);
        data['lastEdited'] = 'receive';
      } else if ('deposit' in payload) {
        data['deposit'] = parseFloat(payload.deposit);
        data['receive'] = '...';
        data['lastEdited'] = 'deposit';
      }

      dispatch({ type: types.PRICE_FETCHED, payload: data });

      if (err.response && err.response.data) {
        dispatch(
          errorAlert({
            message: err.response.data.detail,
            show: true,
            type: types.INVALID_AMOUNT,
          })
        );
      } else {
        dispatch(errorAlert({ show: false, type: types.INVALID_AMOUNT }));
      }

      reject();
    };

    try {
      let url = `${config.API_BASE_URL}/get_price/${pair}/?`;
      url += payload.deposit ? `amount_quote=${payload.deposit}` : `amount_base=${payload.receive}`;

      const amounts = await makeRequest(url);
      setValidValues(amounts);
    } catch (err) {
      /* istanbul ignore next */
      if (window.ga) {
        window.ga('send', 'event', {
          eventCategory: 'Coin selector',
          eventAction: 'Fetch default amounts',
        });
      }

      if (payload.coinSelector) {
        const url = `${config.API_BASE_URL}/get_price/${pair}/`;
        const amounts = await makeRequest(url);

        setValidValues(amounts);
      } else {
        setFaultyValues(err);
      }
    }
  });
};

export const fetchPairs = () => dispatch => {
  const url = `${config.API_BASE_URL}/pair/`;
  const request = axios.get(url);

  return request
    .then(async response => {
      if (!response.data.length) return;

      const params = urlParams();
      const pairs = response.data.filter(pair => {
        if (params && params.hasOwnProperty('test')) {
          return !pair.disabled;
        } else {
          return !pair.disabled && !pair.test_mode;
        }
      });
      const processedPairs = preparePairs(pairs);

      dispatch({ type: types.PAIRS_FETCHED, payload: processedPairs });

      let depositCoin, receiveCoin;
      const coinsFromUrlParams = () => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${config.API_BASE_URL}/pair/${params['pair']}/`)
            .then(res => resolve(res.data))
            .catch(/* istanbul ignore next */ err => reject(err));
        });
      };

      const pickRandomPair = async () => {
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        depositCoin = pair.quote;
        receiveCoin = pair.base;
      };

      // Picks random deposit and receive coins.
      const pickCoins = async () => {
        // Checks if url has params. If yes then update accordingly and if no then pick random coins.
        if (params && params.hasOwnProperty('pair')) {
          try {
            const pair = await coinsFromUrlParams(params);
            depositCoin = pair.quote;
            receiveCoin = pair.base;
          } catch (err) {
            /* istanbul ignore next */
            console.log('Error:', err);
          }
        } else {
          pickRandomPair();
        }
      };
      await pickCoins();

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
      /* istanbul ignore next */
      console.log(error);
    });
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

export const setUserEmail = formData => async dispatch => {
  if (!localStorage.token) return;
  let isObject = typeof(formData) === 'object';
  let payload = (isObject ? formData : { email: formData });

  const url = `${config.API_BASE_URL}/users/me/`;
  const request = axios.put(url, payload);

  return request
    .then(res => {
      if (!window.$crisp.get('user:email')) {
        window.$crisp.push(['set', 'user:email', [email]]);
      }

      dispatch({
        type: types.SET_EMAIL_AND_MESSAGE,
        value: res.data.email,
        message: {
          text: i18n.t('notify.successmail'),
          error: false,
        },
      });
    })
    .catch(() => {
      let errorMessage = i18n.t('generalterms.formfailed');

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
