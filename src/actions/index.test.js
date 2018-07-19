import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as types from './types';
import {
  errorAlert,
  setWallet,
  selectCoin,
  fetchCoinDetails,
  fetchPrice,
  setOrder,
  fetchPairs,
  fetchOrder,
  fetchKyc,
  fetchUserEmail,
  setUserEmail,
} from './index.js';
import currency from 'Mocks/currency';
import pair from 'Mocks/pair';
import order from 'Mocks/order';
import processedPairs from 'Mocks/processedPairs.js';
import kyc from 'Mocks/kyc.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe('actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('errorAlert', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.ERROR_ALERT,
      payload,
    };

    expect(errorAlert('payload')).toEqual(expectedAction);
  });

  it('setWallet', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_WALLET,
      payload,
    };

    expect(setWallet('payload')).toEqual(expectedAction);
  });

  it('selectCoin', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.COIN_SELECTED,
      payload: {
        selectedCoins: payload,
      },
    };

    expect(selectCoin('payload')).toEqual(expectedAction);
  });

  it('setOrder', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_ORDER,
      order: payload,
    };

    expect(setOrder('payload')).toEqual(expectedAction);
  });

  it('fetchCoinDetails', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/currency/').reply(200, currency);

    const expectedActions = [
      {
        type: types.COINS_INFO,
        payload: _.filter(currency, { has_enabled_pairs: true }),
      },
    ];

    return store.dispatch(fetchCoinDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (no initial amount)', () => {
    const mockPriceData = {
      amount_base: 1.53405088,
      amount_quote: 0.1,
      timestamp: 1532007244.247225,
      price: 0.06518689,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit' };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=undefined').reply(200, mockPriceData);
    const expectedActions = [
      {
        type: types.PRICE_FETCHED,
        payload: { pair: 'ETHBTC', deposit: 0.1, receive: 1.53405088, lastEdited: 'deposit' },
      },
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
    ];
    const store = mockStore();
    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial quote set)', () => {
    const mockPriceData = {
      amount_base: 0.76613726,
      amount_quote: 0.05,
      timestamp: 1532007707.730327,
      price: 0.06526246,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit', deposit: '0.05' };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=0.05').reply(200, mockPriceData);

    const expectedActions = [
      {
        type: types.PRICE_FETCHED,
        payload: { pair: 'ETHBTC', lastEdited: 'deposit', deposit: 0.05, receive: 0.76613726 },
      },
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial base set)', () => {
    const mockPriceData = {
      amount_base: 0.7,
      amount_quote: 0.04559358,
      timestamp: 1532007954.45631,
      price: 0.06513369,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'receive', receive: 0.7 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=0.7').reply(200, mockPriceData);

    const expectedActions = [
      {
        type: types.PRICE_FETCHED,
        payload: { pair: 'ETHBTC', lastEdited: 'receive', deposit: 0.04559358, receive: 0.7 },
      },
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial quote too high)', () => {
    const mockPriceData = {
      detail: 'Maximum deposit amount is 0.73607201 BTC on this trade.',
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit', deposit: 100 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=100').reply(400, mockPriceData);

    const expectedActions = [
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: 100,
          receive: '...',
          lastEdited: 'deposit',
        },
      },
      {
        type: types.ERROR_ALERT,
        payload: {
          message: 'Maximum deposit amount is 0.73607201 BTC on this trade.',
          show: true,
          type: 'INVALID_AMOUNT',
        },
      },
    ];

    return store
      .dispatch(fetchPrice(payload))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetchPrice (initial base too high)', () => {
    const mockPriceData = {
      detail: 'Maximum receive amount is 11.39664626 ETH on this trade.',
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'receive', receive: 100 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=100').reply(400, mockPriceData);

    const expectedActions = [
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: '...',
          receive: 100,
          lastEdited: 'receive',
        },
      },
      {
        type: types.ERROR_ALERT,
        payload: {
          message: 'Maximum receive amount is 11.39664626 ETH on this trade.',
          show: true,
          type: 'INVALID_AMOUNT',
        },
      },
    ];

    return store
      .dispatch(fetchPrice(payload))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetchPairs (no initial selection)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/pair/').reply(200, pair);

    const expectedActions = [
      {
        type: types.PAIRS_FETCHED,
        payload: processedPairs,
      },
    ];

    return store.dispatch(fetchPairs()).then(() => {
      expect([store.getActions()[0]]).toEqual(expectedActions);
      expect(store.getActions()[1].type).toEqual(types.COIN_SELECTED);
    });
  });

  it('fetchPairs (url param set)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/pair/').reply(200, pair);
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/pair/ETHBTC').reply(200, {
      name: 'ETHBTC',
      base: 'ETH',
      quote: 'BTC',
      fee_ask: '0.00500000',
      fee_bid: '0.00500000',
      disabled: false,
      test_mode: false,
    });

    window.history.pushState('', '', 'localhost/?pair=ETHBTC');

    const expectedActions = [
      {
        type: types.PAIRS_FETCHED,
        payload: processedPairs,
      },
      {
        type: types.COIN_SELECTED,
        payload: { selectedCoins: { deposit: 'BTC', lastSelected: 'deposit', prev: { deposit: 'BTC', receive: 'ETH' }, receive: 'ETH' } },
      },
    ];

    return store.dispatch(fetchPairs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchOrder', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/orders/OVZL1O/').reply(200, order);

    const payload = 'OVZL1O';
    const expectedActions = [
      {
        type: types.SET_ORDER,
        order,
      },
    ];

    return store.dispatch(fetchOrder(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchOrder (server error)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/orders/OVZL1O/').reply(500, order);

    const payload = 'OVZL1O';
    const expectedActions = [
      {
        type: types.SET_ORDER,
        order: 404,
      },
    ];

    return store.dispatch(fetchOrder(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchOrder (too many requests)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/orders/OVZL1O/').reply(429, order);

    const payload = 'OVZL1O';
    const expectedActions = [
      {
        type: types.SET_ORDER,
        order: 429,
      },
    ];

    return store.dispatch(fetchOrder(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchKyc', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/kyc/O3FZNP/').reply(200, kyc);

    const payload = 'O3FZNP';
    const expectedActions = [{ type: types.SET_KYC, kyc }];

    return store.dispatch(fetchKyc(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchUserEmail', () => {
    window.localStorage.setItem('token', 'some token');

    console.log(window.localStorage.getItem('token'));

    // axiosMock.onGet('https://api.nexchange.io/en/api/v1/kyc/O3FZNP/').reply(200, kyc);

    // const payload = 'O3FZNP';
    // const expectedActions = [{ type: types.SET_KYC, kyc }];

    // return store.dispatch(fetchKyc(payload)).then(() => {
    //   expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});

// export const fetchUserEmail = () => async dispatch => {
//   if (!localStorage.token) return;

//   const url = `${config.API_BASE_URL}/users/me/`;
//   const request = axios.get(url);

//   return request.then(res => dispatch({ type: types.SET_EMAIL, value: res.data.email }));
// };
