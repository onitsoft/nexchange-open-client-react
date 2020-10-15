import axios from 'axios';
import * as types from './types';
import Cookies from 'js-cookie';
import config from 'Config';
import urlParams from 'Utils/urlParams';
import serialize from 'Utils/serialize';
import preparePairs from 'Utils/preparePairs';
import i18n from 'Src/i18n';
import generateDepth from '../utils/generateDepth';

export const errorAlert = payload => ({
  type: types.ERROR_ALERT,
  payload,
});

export const setWallet = payload => ({
  type: types.SET_WALLET,
  payload,
});

export const setWalletSuccess = payload => ({
  type: types.SET_WALLET_SUCCESS,
  payload,
});

export const resetWallet = () => ({
  type: types.RESET_WALLET,
});

export const showWalletAddressModal = payload => ({
  type: types.SHOW_WALLET_ADDRESS_MODAL,
  payload,
});

export const forceWalletAddressModal = payload => ({
  type: types.FORCE_WALLET_ADDRESS_MODAL,
  payload,
});

export const selectCoin = (selectedCoins, pairs) => dispatch => {
  let pairIsValid = true;

  if (selectedCoins.selectedByUser?.deposit || selectedCoins.selectedByUser?.receive)
    pairIsValid = Object.keys(pairs[selectedCoins.deposit]).includes(selectedCoins.receive);

  if (selectedCoins.deposit === selectedCoins.receive || !pairIsValid) {
    const allPairs = pairs[selectedCoins.deposit];
    const validPairs = {};

    for (let item in allPairs) {
      if (allPairs[item] === true) validPairs[item] = true;
    }

    const randomCoin = Math.floor(Math.random() * Math.floor(Object.keys(validPairs).length));
    if (typeof selectedCoins === 'object') selectedCoins.receive = Object.keys(validPairs)[randomCoin];
  }

  dispatch({
    type: types.COIN_SELECTED,
    payload: {
      selectedCoins,
      pairs,
    },
  });
};
export const setDestinationTag = payload => ({
  type: types.SET_DESTINATION_TAG,
  payload,
});

export const setPaymentId = payload => ({
  type: types.SET_PAYMENT_ID,
  payload,
});

export const setMemo = payload => ({
  type: types.SET_MEMO,
  payload,
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
        coins = response.data.filter(elem => {
          const { has_enabled_pairs_for_test } = elem;
          return has_enabled_pairs_for_test === true;
        });
      } else if (isWhiteLabel) {
        coins = response.data.filter(elem => {
          const { has_enabled_pairs, is_crypto } = elem;
          if (has_enabled_pairs && is_crypto) return elem;

          return null;
        });
      } else {
        coins = response.data.filter(elem => {
          const { has_enabled_pairs } = elem;
          return has_enabled_pairs === true;
        });
      }

      dispatch({
        type: types.COINS_INFO,
        payload: coins,
      });
    })
    .catch(error => {
      /* istanbul ignore next */
      console.log(error);
    });
};

export const fetchPrice = payload => dispatch => {
  const pair = payload.pair;
  const lastEdited = payload.lastEdited;

  dispatch(
    errorAlert({
      show: false,
      type: types.INVALID_AMOUNT,
    })
  );

  //Set deposit value using amount_quote param in url.
  if (payload && !payload.deposit) {
    const params = urlParams();
    if (params && params.hasOwnProperty('amount_quote')) {
      payload.deposit = parseFloat(params['amount_quote']);
    }
  }

  if (payload.coinSelector || payload.deposit || payload.receive) {
    dispatch({
      type: types.FETCHING_PRICE,
    });
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
      const data = {
        pair,
      };

      if (payload.deposit || payload.receive) {
        // Comment: Deposit amount in API is same as entered by user
        const depositIsSame = parseFloat(payload.deposit) === parseFloat(amounts.amount_quote);
        const receiveIsSame = parseFloat(payload.receive) === parseFloat(amounts.amount_base);

        if (payload.deposit) {
          if (payload.deposit >= amounts.min_amount_quote && payload.deposit <= amounts.max_amount_quote) {
            depositIsSame ? (data['deposit'] = parseFloat(payload.deposit)) : (data['deposit'] = parseFloat(amounts.amount_quote));
            data['receive'] = parseFloat(amounts.amount_base);
          } else {
            data['deposit'] = parseFloat(amounts.amount_quote);
            data['receive'] = parseFloat(amounts.amount_base);
          }
        }

        if (payload.receive) {
          if (payload.receive >= amounts.min_amount_base && payload.receive <= amounts.max_amount_base) {
            receiveIsSame ? (data['receive'] = payload.receive) : (data['receive'] = parseFloat(amounts.amount_base));
            data['deposit'] = parseFloat(amounts.amount_quote);
          } else {
            data['deposit'] = parseFloat(amounts.amount_quote);
            data['receive'] = parseFloat(amounts.amount_base);
          }
        }
      } else {
        data['deposit'] = parseFloat(amounts.amount_quote);
        data['receive'] = parseFloat(amounts.amount_base);
      }

      data['min_amount_quote'] = parseFloat(amounts.min_amount_quote);
      data['max_amount_quote'] = parseFloat(amounts.max_amount_quote);
      data['min_amount_base'] = parseFloat(amounts.min_amount_base);
      data['max_amount_base'] = parseFloat(amounts.max_amount_base);
      data['lastEdited'] = lastEdited;

      dispatch({
        type: types.PRICE_FETCHED,
        payload: data,
      });

      resolve();
    };

    const setFaultyValues = err => {
      let data = {
        pair,
      };

      if (err.response.data) {
        data['min_amount_quote'] = parseFloat(err.response.data.min_amount_quote);
        data['max_amount_quote'] = parseFloat(err.response.data.max_amount_quote);
        data['min_amount_base'] = parseFloat(err.response.data.min_amount_base);
        data['max_amount_base'] = parseFloat(err.response.data.max_amount_base);
      }

      window.gtag('event', 'Change amount', { event_category: 'Amount Input', event_label: `Amount too high/low error` });

      if ('receive' in payload) {
        data['deposit'] = '...';
        data['receive'] = parseFloat(payload.receive);
        data['lastEdited'] = 'receive';
      } else if ('deposit' in payload) {
        data['deposit'] = parseFloat(payload.deposit);
        data['receive'] = '...';
        data['lastEdited'] = 'deposit';
      }

      dispatch({
        type: types.PRICE_FETCHED,
        payload: data,
      });

      if (err.response && err.response.data) {
        dispatch(
          errorAlert({
            message: err.response.data.detail,
            show: true,
            type: types.INVALID_AMOUNT,
          })
        );
      } else {
        dispatch(
          errorAlert({
            show: false,
            type: types.INVALID_AMOUNT,
          })
        );
      }

      reject();
    };

    try {
      let url = `${config.API_BASE_URL}/get_price/${pair}/?`;
      url += payload.deposit ? `amount_quote=${payload.deposit}` : `amount_base=${payload.receive}`;

      const amounts = await makeRequest(url);
      setValidValues(amounts);
    } catch (err) {
      window.gtag('event', 'Fetch default amounts', { event_category: 'Coin Selector', event_label: `` });

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

export const fetchPairs = ({ base, quote } = {}) => dispatch => {
  const url = `${config.API_BASE_URL}/pair/`;
  const request = axios.get(url);

  return request
    .then(async response => {
      let params = urlParams();
      const pathNameParams = window.location.pathname.split('/');
      // Checks if pathname section of url has params.
      if (pathNameParams[1] === 'pair') {
        params = {};
        params.pair = pathNameParams[2].toUpperCase();
      }
      const pairs = response.data.filter(pair => {
        if (params && params.hasOwnProperty('test')) {
          return !pair.disabled;
        } else {
          return !pair.disabled && !pair.test_mode;
        }
      });
      const processedPairs = preparePairs(pairs);

      dispatch({
        type: types.PAIRS_FETCHED,
        payload: processedPairs,
      });

      let depositCoin = base;
      let receiveCoin = quote;

      const loadPair = pair => {
        const url = `${config.API_BASE_URL}/pair/${pair.toUpperCase()}/`;
        return new Promise((resolve, reject) => {
          axios
            .get(url)
            .then(res => resolve(res.data))
            .catch(err => {
              resolve(pickRandomPair());
            });
        });
      };

      const pickMostTraded = () => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${config.API_BASE_URL}/pair/most_traded/`)
            .then(res => resolve(res.data))
            .catch(err => resolve(null));
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
        if (base && quote) {
          try {
            const pair = await loadPair(`${base}${quote}`);
            if (pair) {
              depositCoin = pair.quote;
              receiveCoin = pair.base;
            }
          } catch (err) {
            /* istanbul ignore next */
            console.log('Error:', err);
          }
        } else if (params && params.hasOwnProperty('pair')) {
          try {
            const pair = await loadPair(params.pair);
            if (pair) {
              depositCoin = pair.quote;
              receiveCoin = pair.base;
            }
          } catch (err) {
            /* istanbul ignore next */
            console.log('Error:', err);
          }
        } else {
          const pair = await pickMostTraded();
          if (pair) {
            depositCoin = pair.quote;
            receiveCoin = pair.base;
          } else {
            pickRandomPair();
          }
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
          selectedByUser: {
            deposit: false,
            receive: false,
          },
        })
      );
    })
    .catch(error => {
      /* istanbul ignore next */
      console.log(error);
    });
};

export const showSupportModal = payload => ({
  type: types.SHOW_SUPPORT_MODAL,
  payload,
});

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
        //If order ref not found in /orders, search in /limit_order
        const urlLimitOrder = `${config.API_BASE_URL}/limit_order/${orderId}/`;
        const requestLimitOrder = axios.get(urlLimitOrder);

        return requestLimitOrder
          .then(res => {
            const order = res.data;
            order.isLimitOrder = true;
            dispatch(setOrder(order));
          })
          .catch(error => {
            if (error.response && error.response.status === 429) {
              dispatch(setOrder(429));
            } else if (error.response) {
              dispatch(setOrder(404));
            }
          });
      }
    });
};

export const fetchKyc = orderId => async dispatch => {
  const url = `${config.API_BASE_URL}/kyc/${orderId}/`;
  const request = axios.get(url);

  return request
    .then(res =>
      dispatch({
        type: types.SET_KYC,
        kyc: res.data,
      })
    )
    .catch(error => {});
};

export const fetchUserEmail = () => async dispatch => {
  if (!localStorage.token) return;

  const url = `${config.API_BASE_URL}/users/me/`;
  const request = axios.get(url);

  return request.then(res =>
    dispatch({
      type: types.SET_EMAIL,
      value: res.data.email,
    })
  );
};

export const setUserEmail = formData => async dispatch => {
  if (!localStorage.token) return;
  let isObject = typeof formData === 'object';
  let payload = isObject
    ? formData
    : {
        email: formData,
      };

  const url = `${config.API_BASE_URL}/users/me/`;
  const request = axios.put(url, payload);

  return request
    .then(res => {
      dispatch({
        type: types.SET_EMAIL_AND_MESSAGE,
        value: res.data.email,
        message: {
          text: i18n.t('notify.successmail'),
          error: false,
        },
      });
    })
    .catch(e => {
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

//ORDER BOOK
export const changeOrderMode = mode => ({
  type: types.ORDER_MODE_CHANGE,
  mode: mode,
});

export const changeOrderBookValue = orderBook => ({
  type: types.ORDER_BOOK_VALUE_CHANGE,
  orderBook: orderBook,
});

export const fetchOrderBook = payload => dispatch => {
  const orderBook = payload.orderBook;

  if (!payload.pair) {
    dispatch({
      type: types.ORDER_BOOK_DATA_FETCHED,
      orderBook,
    });
  }

  let url = `${config.API_BASE_URL}/limit_order/?`;
  url += `pair=${payload.pair}`;
  if (payload.status) {
    url += `&book_status=${payload.status}`;
  }
  if (payload.type) {
    url += `&order_type=${payload.type}`;
  }

  const request = axios.get(url);
  let data = [];
  const getData = () =>
    new Promise((resolve, reject) => {
      return request
        .then(result => {
          data = data.concat(result.data.results);
          if (result.data.next != null) {
            resolve(request());
          } else {
            resolve(data);
          }
        })
        .catch(error => {
          /* istanbul ignore next */
          console.log(error);
          resolve([]);
        });
    });

  return getData()
    .then(result => {
      if (payload.status === 'OPEN' && payload.type === 'SELL') {
        orderBook.sellDepth = generateDepth(result, payload.type);
      }
      if (payload.status === 'OPEN' && payload.type === 'BUY') {
        orderBook.buyDepth = generateDepth(result, payload.type);
      }
      if (payload.status === 'CLOSED') {
        orderBook.history = result;
      }

      dispatch({
        type: types.ORDER_BOOK_DATA_FETCHED,
        orderBook,
      });
    })
    .catch(error => {
      /* istanbul ignore next */
      console.log(error);
      dispatch({
        type: types.ORDER_BOOK_DATA_FETCHED,
        orderBook,
      });
    });
};

export const loadAuth = () => dispatch => {
  if (localStorage.full_token) {
    const tokenData = JSON.parse(localStorage.full_token);
    dispatch({
      type: types.AUTH_TOKEN_RECEIVED,
      payload: tokenData,
    });
  }
};

export const loadUserDetails = () => dispatch => {
  return axios.get(`${config.API_BASE_URL}/users/me`).then(({ data, ...rest }) => {
    dispatch({
      type: types.AUTH_USER_PROFILE,
      payload: data,
    });
  });
};

export const loadUserOrders = () => dispatch => {
  return axios.get(`${config.API_BASE_URL}/users/me/orders`).then(({ data, ...rest }) => {
    dispatch({
      type: types.AUTH_LOAD_ORDERS,
      payload: data.results,
    });
  });
};

export const requestPasswordReset = email => dispatch => {
  dispatch({ type: types.AUTH_LOADING });
  return axios
    .post(`${config.API_BASE_URL}/password_reset`, { email })
    .then(({ data, ...rest }) => {
      if (data && data.result && data.result === 'Please check your E-mail') {
        dispatch({
          type: types.AUTH_PASSWORD_RESET,
          payload: data.result,
        });
      }
    })
    .catch(err => {
      if (err && err.response) {
        const {
          response: { data },
        } = err;
        dispatch({
          type: types.AUTH_PASSWORD_RESET_FAILED,
          payload: data,
        });
      }
    });
};

export const resetPassword = (hash, password) => dispatch => {
  if (!hash) throw new Error('Reset token is required');
  if (!password) throw new Error('Password is required');

  dispatch({ type: types.AUTH_LOADING });

  return axios
    .post(`${config.API_BASE_URL}/password_reset_complete`, { hash, password })
    .then(({ data, ...rest }) => {
      dispatch({
        type: types.AUTH_PASSWORD_RESET_SUCCESS,
        payload: data,
      });
      Cookies.remove('resetToken');
    })
    .catch(err => {
      dispatch({
        type: types.AUTH_PASSWORD_RESET_FAILED,
        payload: err,
      });
    });
};

export const signIn = (username, password) => dispatch => {
  const params = {
    grant_type: 'password',
    client_id: config.AUTH_CLIENT_ID,
    username: username,
    password: password,
  };

  dispatch({ type: types.AUTH_LOADING });

  axios
    .post(`${config.API_BASE_URL}/oAuth2/token/`, serialize(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      auth: {
        username: config.AUTH_CLIENT_ID,
        password: config.AUTH_CLIENT_SECRET,
      },
    })
    .then(({ data, ...rest }) => {
      const token = {
        ...data,
        issued_at: Date.now(),
      };
      if (data && data.access_token) {
        localStorage.token = data.access_token;
        localStorage.full_token = JSON.stringify(token);
        dispatch({
          type: types.AUTH_TOKEN_RECEIVED,
          payload: token,
        });
        dispatch({
          type: types.AUTH_COMPLETE,
        });
      } else {
        throw new Error('Unexpected authentication result:', { data, ...rest });
      }
    })
    .catch(err => {
      dispatch({
        type: types.AUTH_FAILED,
        payload: err,
      });
    });
};

export const signUp = details => dispatch => {
  const { username, password, email, phone } = details;
  dispatch({
    type: types.AUTH_SIGN_UP,
    payload: details,
  });

  return axios
    .post(`${config.API_BASE_URL}/users`, {
      username,
      password,
      email,
      phone,
    })
    .then(({ data, ...rest }) => {
      dispatch({
        type: types.AUTH_USER_REGISTERED,
        payload: data,
      });

      return data;
    })
    .catch(err => {
      const { response, message } = err;
      const { data } = response || { data: message };

      console.error('Unable to signup. Error:', err);

      dispatch({
        type: types.AUTH_REGISTRATION_FAILED,
        payload: data,
      });

      return err;
    });
};

export const signOut = () => dispatch => {
  localStorage.token = localStorage.full_token = null;
  dispatch({
    type: types.AUTH_SIGN_OUT,
  });
};
export const completeRegistration = () => dispatch => {
  dispatch({
    type: types.AUTH_REGISTRATION_COMPLETE,
  });
};
