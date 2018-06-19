import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ExchangeWidget from './ExchangeWidget.js';

describe('ExchangeWidget', () => {
  const initialState = {
    wallet: { address: '', valid: false, show: false },
    selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'deposit' },
    price: { pair: 'ETHOMG', deposit: 101, receive: 1.76250023, lastEdited: 'deposit' },
    error: { show: false, type: 'INVALID_AMOUNT' },
  };
  const mockStore = configureStore();
  let store, wrap;

  beforeEach(() => {
    store = mockStore(initialState);
    wrap = shallow(<ExchangeWidget store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(wrap).toMatchSnapshot();
  });

  it('button changes on wallet shown', () => {
    expect(wrap.find('button').text()).toEqual('Get Started !');
    wrap.setProps({ wallet: { address: '', valid: false, show: true } });
    expect(wrap.find('button').text()).toEqual('Confirm & Place Order');
  });

  it('contains CoinInput, WalletAddress', () => {
    expect(wrap.find('Connect(CoinInput)').exists()).toBe(true);
    expect(wrap.find('Connect(WalletAddress)').exists()).toBe(true);
  });
});
