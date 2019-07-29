import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LimitOrderForm from './LimitOrderForm.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LimitOrderForm', () => {
  const initialState = {
    selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'deposit' },
    orderBook: { order_type: 'BUY', quantity: '100', limit_rate: '0.01', sellDepth: [], buyDepth: [], history: [], myOrders: [],}
  };
  let store, wrapShallow;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallow = shallow(<LimitOrderForm store={store} />).dive().dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('has quantity and limit rate inputs with correct values', () => {
    expect(wrapShallow.find('#quantity').length).toBe(1);
    expect(wrapShallow.find('#limit-rate').length).toBe(1);
  });
});

