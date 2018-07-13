import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CoinSelectorTesting as CoinSelector } from './CoinSelector.js';
import coinsInfo from 'Mocks/currency.js';
import pairs from 'Mocks/processedPairs.js';

describe('CoinSelector', () => {
  let initialState = {
    coinsInfo,
    pairs,
    price: { pair: 'ETHOMG', deposit: 101, receive: 1.76250023, lastEdited: 'deposit' },
    selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'receive' },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store, wrapShallowDeposit, wrapShallowReceive, wrapMountDeposit, wrapMountReceive;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallowDeposit = shallow(<CoinSelector type="deposit" store={store} />).dive();
    wrapShallowReceive = shallow(<CoinSelector type="receive" store={store} />).dive();
    wrapMountDeposit = mount(<CoinSelector type="deposit" store={store} onSelect={jest.fn()} />);
    wrapMountReceive = mount(<CoinSelector type="receive" store={store} onSelect={jest.fn()} />);
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
    wrapMountDeposit.find('[data-test="selector"]').simulate('click');
    wrapMountDeposit.find('[data-test="BTC"]').simulate('click');
    const expectedPayload = {
      type: 'COIN_SELECTED',
      payload: { selectedCoins: { deposit: 'BTC', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'deposit' } },
    };
    expect(store.getActions()).toEqual([expectedPayload]);
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
    wrapMountReceive.find('[data-test="selector"]').simulate('click');
    wrapMountReceive.find('[data-test="BTC"]').simulate('click');
    const expectedPayload = {
      type: 'COIN_SELECTED',
      payload: { selectedCoins: { deposit: 'OMG', receive: 'BTC', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'receive' } },
    };
    expect(store.getActions()).toEqual([expectedPayload]);
  });
});
