import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CoinSelectorTesting as CoinSelector } from './CoinSelector.js';
import CoinsDropdown from './CoinsDropdown/CoinsDropdown';
import coinsInfo from 'Mocks/currency.js';
import pairs from 'Mocks/processedPairs.js';
import reducers from 'Reducers';

describe('CoinSelector', () => {
  let store, createStoreWithMiddleware, wrapShallowDeposit, wrapShallowReceive, wrapMountDeposit, wrapMountReceive;
  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHOMG/?amount_base=undefined').reply(200, {
      amount_base: 1.40374611,
      amount_quote: 101.0,
      timestamp: 1533114712.278441,
      price: 71.95033296,
      pair: {
        base: 'ETH',
        quote: 'OMG',
      },
      max_amount_base: 2.78459624,
      max_amount_quote: 200.0,
      min_amount_base: 0.01,
      min_amount_quote: 1.07542446,
    });

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
      .dive()
      .dive();

    wrapShallowReceive = shallow(
      <Provider store={store}>
        <CoinSelector type="receive" store={store} />
      </Provider>
    )
      .dive()
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
    expect(wrapShallowDeposit.find(CoinsDropdown).length).toEqual(0);
    wrapShallowDeposit.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowDeposit.find(CoinsDropdown).length).toEqual(1);
  });

  it('clicking on arrow causes dropdown to appear (deposit)', () => {
    expect(wrapShallowDeposit.find(CoinsDropdown).length).toEqual(0);
    wrapShallowDeposit.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowDeposit.find(CoinsDropdown).length).toEqual(1);
  });

  it('selecting coin from dropdown causes correct action to be selected (deposit)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/ETHBTC/?amount_quote=101').reply(200, {
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
    expect(wrapShallowReceive.find(CoinsDropdown).length).toEqual(0);
    wrapShallowReceive.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowReceive.find(CoinsDropdown).length).toEqual(1);
  });

  it('clicking on arrow causes dropdown to appear (receive)', () => {
    wrapShallowReceive.find('[data-test="selector"]').simulate('click');
    expect(wrapShallowReceive.find(CoinsDropdown).length).toEqual(1);
  });

  it('selecting coin from dropdown causes correct coin to be selected (deposit)', () => {
    axiosMock.onGet('https://api.nexchange.io/en/api/v1/get_price/BTCOMG/?amount_quote=101').reply(200, {
      amount_base: 4176.70201222,
      amount_quote: 59.0,
      price: 0.01412598,
    });

    expect(wrapMountReceive.find('[data-test="selected"]').text()).toBe('ETH');
    wrapMountReceive.find('[data-test="selector"]').simulate('click');
    wrapMountReceive.find('[data-test="BTC"]').simulate('click');
    expect(wrapMountReceive.find('[data-test="selected"]').text()).toBe('BTC');
  });

  it('typing on search field and submitting search form causes correct coin to be selected (deposit)', () => {
    wrapMountDeposit.find('[data-test="selector"]').simulate('click');

    let input = wrapMountDeposit.find('[data-test="search"]');

    input.simulate('change', {
      target: { value: 'bit' },
    });

    let searchForm = wrapMountDeposit.find('[data-test="search-form"]');
    searchForm.simulate('submit', { preventDefault() {} });

    expect(wrapMountDeposit.find('[data-test="selected"]').text()).toBe('BCH');
  });
});
