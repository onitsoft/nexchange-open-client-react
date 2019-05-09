import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';
import * as types from './types';
import {
  errorAlert,
  setWallet,
  setDestinationTag,
  setPaymentId,
  setMemo,
  selectCoin,
  fetchCoinDetails,
  fetchPrice,
  setOrder,
  fetchPairs,
  fetchOrder,
  fetchKyc,
  fetchUserEmail,
  setUserEmail,
  changeOrderMode,
  changeOrderBookValue
} from './index.js';
import currency from 'Mocks/currency';
import pair from 'Mocks/pair';
import order from 'Mocks/order';
import kyc from 'Mocks/kyc.js';
import preparePairs from '../utils/preparePairs';

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
    localStorage.removeItem('token');
    window.history.pushState('', '', 'localhost');
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

  it('setDestinationTag', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_DESTINATION_TAG,
      payload,
    };

    expect(setDestinationTag('payload')).toEqual(expectedAction);
  });

  it('setPaymentId', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_PAYMENT_ID,
      payload,
    };

    expect(setPaymentId('payload')).toEqual(expectedAction);
  });

  it('setMemo', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_MEMO,
      payload,
    };

    expect(setMemo('payload')).toEqual(expectedAction);
  });

  it('selectCoin', () => {
    const payload = 'payload';
    const pairs = 'pairs';
    const expectedActions = [{
      type: types.COIN_SELECTED,
      payload: {
        selectedCoins: payload,
        pairs: pairs
      },
    }];

    store.dispatch(selectCoin('payload','pairs'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('setOrder', () => {
    const payload = 'payload';
    const expectedAction = {
      type: types.SET_ORDER,
      order: payload,
    };

    expect(setOrder('payload')).toEqual(expectedAction);
  });

  it('fetchCoinDetails (default)', () => {
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

  it('fetchCoinDetails (test)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/currency/').reply(200, currency);
    window.history.pushState('', '', 'localhost/?test=true');

    const expectedActions = [
      {
        type: types.COINS_INFO,
        payload: _.filter(currency, { has_enabled_pairs_for_test: true }),
      },
    ];

    return store.dispatch(fetchCoinDetails()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (no initial amount)', () => {
    const mockData = {
      amount_base: 1.776119,
      amount_quote: 0.1,
      timestamp: 1533111419.578647,
      price: 0.05630253,
      pair: {
        base: 'ETH',
        quote: 'BTC',
      },
      max_amount_base: 6.785239,
      max_amount_quote: 0.38123443,
      min_amount_base: 0.01,
      min_amount_quote: 0.00084218,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit' };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=undefined').reply(200, mockData);
    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: mockData.amount_quote,
          receive: mockData.amount_base,
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'deposit',
        },
      }
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial amounts set and selected coin causes inputs to be incorrect)', () => {
    const mockData = {
      amount_base: 32785.8852459,
      amount_quote: 0.1,
      timestamp: 1533111892.372815,
      price: 3.05e-6,
      pair: {
        base: 'XVG',
        quote: 'BTC',
      },
      max_amount_base: 1615892.8530833,
      max_amount_quote: 5.0,
      min_amount_base: 100.0,
      min_amount_quote: 0.00030806,
    };

    const payload = { pair: 'XVGBTC', lastEdited: 'deposit', coinSelector: true, deposit: 520 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/XVGBTC/').reply(200, mockData);
    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
      {
        type: types.FETCHING_PRICE,
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'XVGBTC',
          deposit: mockData.amount_quote,
          receive: mockData.amount_base,
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'deposit',
        },
      },
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial quote set)', () => {
    const mockData = {
      amount_base: 0.88500515,
      amount_quote: 0.05,
      timestamp: 1533112010.658954,
      price: 0.05649685,
      pair: {
        base: 'ETH',
        quote: 'BTC',
      },
      max_amount_base: 6.785239,
      max_amount_quote: 0.38147188,
      min_amount_base: 0.01,
      min_amount_quote: 0.0008427,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit', deposit: '0.05' };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=0.05').reply(200, mockData);

    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: mockData.amount_quote,
          receive: mockData.amount_base,
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'deposit',
        },
      }
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial base set)', () => {
    const mockData = {
      amount_base: 0.7,
      amount_quote: 0.03960651,
      timestamp: 1533112030.53049,
      price: 0.05658073,
      pair: {
        base: 'ETH',
        quote: 'BTC',
      },
      max_amount_base: 6.785239,
      max_amount_quote: 0.38147188,
      min_amount_base: 0.01,
      min_amount_quote: 0.0008427,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'receive', receive: 0.7 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=0.7').reply(200, mockData);

    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: mockData.amount_quote,
          receive: mockData.amount_base,
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'receive',
        },
      }
    ];

    return store.dispatch(fetchPrice(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchPrice (initial quote too high)', () => {
    const mockData = {
      detail: 'Maximum deposit amount is 0.38140391 BTC on this trade.',
      pair: {
        base: 'ETH',
        quote: 'BTC',
      },
      max_amount_base: 6.785239,
      max_amount_quote: 0.38140391,
      min_amount_base: 0.01,
      min_amount_quote: 0.00084255,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'deposit', deposit: 100 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=100').reply(400, mockData);

    const expectedActions = [
      {
        payload: { show: false, type: 'INVALID_AMOUNT' },
        type: types.ERROR_ALERT,
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: 100,
          receive: '...',
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'deposit',
        },
      },
      {
        type: types.ERROR_ALERT,
        payload: {
          message: mockData.detail,
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

  it('fetchPrice (initial quote too high and no error message received)', () => {
    const payload = { pair: 'ETHBTC', lastEdited: 'deposit', deposit: 100 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=100').reply(400);

    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: { show: false, type: 'INVALID_AMOUNT' },
      },
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
        payload: { show: false, type: 'INVALID_AMOUNT' },
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
    const mockData = {
      detail: 'Maximum receive amount is 15.5258463 ETH on this trade.',
      pair: {
        base: 'ETH',
        quote: 'BTC',
      },
      max_amount_base: 15.5258463,
      max_amount_quote: 0.87162044,
      min_amount_base: 0.01,
      min_amount_quote: 0.00084141,
    };

    const payload = { pair: 'ETHBTC', lastEdited: 'receive', receive: 100 };

    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_base=100').reply(400, mockData);

    const expectedActions = [
      {
        type: types.ERROR_ALERT,
        payload: {
          show: false,
          type: 'INVALID_AMOUNT',
        },
      },
      {
        type: types.PRICE_FETCHED,
        payload: {
          pair: 'ETHBTC',
          deposit: '...',
          receive: 100,
          min_amount_quote: mockData.min_amount_quote,
          max_amount_quote: mockData.max_amount_quote,
          min_amount_base: mockData.min_amount_base,
          max_amount_base: mockData.max_amount_base,
          lastEdited: 'receive',
        },
      },
      {
        type: types.ERROR_ALERT,
        payload: {
          message: mockData.detail,
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

    const pairs = pair.filter(pair => !pair.disabled && !pair.test_mode);
    const processedPairs = preparePairs(pairs);

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

  it('fetchPairs (no initial selection and test)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/pair/').reply(200, pair);
    window.history.pushState('', '', 'localhost/?test=true');

    const pairs = pair.filter(pair => !pair.disabled);
    const processedPairs = preparePairs(pairs);

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
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/pair/ETHBTC/').reply(200, {
      name: 'ETHBTC',
      base: 'ETH',
      quote: 'BTC',
      fee_ask: '0.00500000',
      fee_bid: '0.00500000',
      disabled: false,
      test_mode: false,
    });

    window.history.pushState('', '', 'localhost/?pair=ETHBTC');
    const pairs = pair.filter(pair => !pair.disabled && !pair.test_mode);
    const processedPairs = preparePairs(pairs);

    const expectedActions = [
      {
        type: types.PAIRS_FETCHED,
        payload: processedPairs,
      },
      {
        type: types.COIN_SELECTED,
        payload: { selectedCoins: { deposit: 'BTC', receive: 'ETH', lastSelected: 'deposit', prev: { deposit: 'BTC', receive: 'ETH' }, selectedByUser: {
          deposit: false,
          receive: false,
        } } },
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

  it('fetchUserEmail (no token)', () => {
    const expectedActions = [];
    return store.dispatch(fetchUserEmail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchUserEmail (with token)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/users/me/').reply(200, { username: 'Anonymous18878', email: 'email@email.com' });
    localStorage.setItem('token', 'some token');

    const expectedActions = [
      {
        type: types.SET_EMAIL,
        value: 'email@email.com',
      },
    ];

    return store.dispatch(fetchUserEmail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('setUserEmail (no token)', () => {
    const payload = 'email@email.com';
    const expectedActions = [];
    return store.dispatch(setUserEmail(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('setUserEmail (with token and success)', () => {
    const payload = 'email@email.com';

    window.$crisp = {};
    window.$crisp.get = jest.fn();
    window.$crisp.push = jest.fn();

    axiosMock
      .onPut('https://api.nexchange.io/en/api/v1/users/me/', { email: payload })
      .reply(200, { username: 'Anonymous18878', email: 'email@email.com' });
    localStorage.setItem('token', 'some token');

    const expectedActions = [
      {
        type: types.SET_EMAIL_AND_MESSAGE,
        value: payload,
        message: {
          text: 'notify.successmail',
          error: false,
        },
      },
    ];

    return store.dispatch(setUserEmail(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('setUserEmail (with token and no success)', () => {
    const payload = 'email@email.com';

    window.$crisp = {};
    window.$crisp.get = jest.fn();
    window.$crisp.push = jest.fn();

    axiosMock.onPut('https://api.nexchange.io/en/api/v1/users/me/', { email: payload }).reply(500);
    localStorage.setItem('token', 'some token');

    const expectedActions = [
      {
        type: types.SET_EMAIL_AND_MESSAGE,
        value: '',
        message: { error: true, text: 'generalterms.formfailed' },
      },
    ];

    return store.dispatch(setUserEmail(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  //Order Book
  it('changeOrderMode', () => {
    const payload = 'ORDER_BOOK';
    const expectedAction = 
      {
        type: types.ORDER_MODE_CHANGE,
        mode: 'ORDER_BOOK',
      };

    return expect(changeOrderMode(payload)).toEqual(expectedAction);
  });

  it('changeOrderBookValue (order_type)', () => {
    const payload = {    
      order_type: 'SELL',
      quantity: '',
      limit_rate: '',
      sellDepth: [],
      buyDepth: [],
      history: [],
      myOrders: [],
    };
    const expectedAction = 
      {
        type: types.ORDER_BOOK_VALUE_CHANGE,
        orderBook: payload,
      };

    return expect(changeOrderBookValue(payload)).toEqual(expectedAction);
  });
});