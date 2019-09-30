import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderBookWidget from './OrderBookWidget.js';
import CoinSelector from '../ExchangeWidget/CoinInput/CoinSelector/CoinSelector';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('OrderBookWidget', () => {
  const initialState = {
    wallet: { address: '', valid: false, show: false },
    selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'deposit' },
    price: { pair: 'ETHOMG', deposit: 101, receive: 1.76250023, lastEdited: 'deposit' },
    error: { show: false, type: 'INVALID_AMOUNT' },
    orderBook: { order_type: 'BUY', quantity: '', limit_rate: '', sellDepth: [], buyDepth: [], history: [], myOrders: [],}
  };
  let store, wrapShallow;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallow = shallow(<OrderBookWidget store={store} />).dive().dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('contains CoinInput, WalletAddress, LimitForm, OrderDepth, MyOrders, button ', () => {
    expect(wrapShallow.find(CoinSelector).length).toBe(2);
    expect(wrapShallow.find('Connect(WalletAddress)').length).toBe(1);
    expect(wrapShallow.find('Connect(LimitOrderForm)').length).toBe(1);
    expect(wrapShallow.find('Connect(OrderDepth)').length).toBe(1);
    expect(wrapShallow.find('Connect(MyOrders)').length).toBe(1);
    expect(wrapShallow.find('button').length).toBe(1);
  });

  it('submit button changes on wallet shown', () => {
    expect(wrapShallow.find('button').text()).toEqual('orderbookwidget.buy ETH orderbookwidget.with OMG');
  });
});

