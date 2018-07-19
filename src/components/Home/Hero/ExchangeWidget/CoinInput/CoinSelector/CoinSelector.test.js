import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { CoinSelectorTesting as CoinSelector } from './CoinSelector.js';
import coinsInfo from 'Mocks/currency.js';
import pairs from 'Mocks/processedPairs.js';
import reducers from 'Reducers';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('CoinSelector', () => {
  let store, createStoreWithMiddleware, wrapShallowDeposit, wrapShallowReceive, wrapMountDeposit, wrapMountReceive;

  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    store = createStoreWithMiddleware(reducers, {
      coinsInfo,
      pairs,
      price: { pair: 'ETHOMG', deposit: 101, receive: 1.76250023, lastEdited: 'deposit' },
      selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'receive' },
    });

    wrapShallowDeposit = shallow(
      <Provider store={store}>
        <CoinSelector type="deposit" store={store} />
      </Provider>
    )
      .dive()
      .dive();
    wrapShallowReceive = shallow(
      <Provider store={store}>
        <CoinSelector type="receive" store={store} />
      </Provider>
    )
      .dive()
      .dive();
    wrapMountDeposit = mount(
      <Provider store={store}>
        <CoinSelector type="deposit" store={store} onSelect={jest.fn()} />
      </Provider>
    );
    wrapMountReceive = mount(
      <Provider store={store}>
        <CoinSelector type="receive" store={store} onSelect={jest.fn()} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(wrapShallowDeposit).toMatchSnapshot();
    expect(wrapShallowReceive).toMatchSnapshot();
  });

  it('initially coins dropdown is hidden (deposit)', () => {
    expect(wrapShallowDeposit.find('CoinsDropdown').length).toEqual(0);
    wrapShallowDeposit.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowDeposit.find('CoinsDropdown').length).toEqual(1);
  });

  it('clicking on arrow causes dropdown to appear (deposit)', () => {
    wrapShallowDeposit.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowDeposit.find('CoinsDropdown').length).toEqual(1);
  });

  it('selecting coin from dropdown causes correct action to be dispatched (deposit)', () => {
    mock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=101').reply(200, {
      amount_base: 4176.70201222,
      amount_quote: 59.0,
      price: 0.01412598,
    });

    expect(wrapMountDeposit.find('[data-test="selected"]').text()).toBe('OMG');
    wrapMountDeposit.find('[data-test="selector"]').simulate('click');
    wrapMountDeposit.find('[data-test="BTC"]').simulate('click');
    expect(wrapMountDeposit.find('[data-test="selected"]').text()).toBe('BTC');
  });

  it('initially coins dropdown is hidden (receive)', () => {
    expect(wrapShallowReceive.find('CoinsDropdown').length).toEqual(0);
    wrapShallowReceive.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowReceive.find('CoinsDropdown').length).toEqual(1);
  });

  it('clicking on arrow causes dropdown to appear (receive)', () => {
    wrapShallowReceive.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowReceive.find('CoinsDropdown').length).toEqual(1);
  });

  it('selecting coin from dropdown causes correct coin to be dispatched (deposit)', () => {
    mock.onGet('https://api.nexchange.io/en/api/v1/get_price/BTCOMG/?amount_quote=101').reply(200, {
      amount_base: 4176.70201222,
      amount_quote: 59.0,
      price: 0.01412598,
    });

    expect(wrapMountReceive.find('[data-test="selected"]').text()).toBe('ETH');
    wrapMountReceive.find('[data-test="selector"]').simulate('click');
    wrapMountReceive.find('[data-test="BTC"]').simulate('click');
    expect(wrapMountReceive.find('[data-test="selected"]').text()).toBe('BTC');
  });
});
