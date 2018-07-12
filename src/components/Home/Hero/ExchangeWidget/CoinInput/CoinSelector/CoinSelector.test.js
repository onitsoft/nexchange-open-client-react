import React from 'react';
import { shallow, mount } from 'enzyme';
import CoinSelector from './CoinSelector.js';
import coinsInfo from 'Mocks/currency.js';

describe('CoinSelector', () => {
  let wrapShallowDeposit, wrapShallowReceive, wrapMountDeposit;

  beforeEach(() => {
    wrapShallowDeposit = shallow(<CoinSelector type="deposit" onClick={jest.fn()} coinsInfo={coinsInfo} />);
    wrapShallowReceive = shallow(<CoinSelector type="receive" onClick={jest.fn()} coinsInfo={coinsInfo} />);
    wrapMountDeposit = mount(<CoinSelector type="deposit" onClick={jest.fn()} coinsInfo={coinsInfo} />);
  });

  it('renders correctly', () => {
    expect(wrapShallowDeposit).toMatchSnapshot();
    expect(wrapShallowReceive).toMatchSnapshot();
  });

  it('deposit dropdown contains correct coins', () => {
    for (const coin of coinsInfo) {
      if (coin.is_quote_of_enabled_pair) {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });

  it('receive dropdown contains correct coins', () => {
    for (const coin of coinsInfo) {
      if (coin.is_base_of_enabled_pair) {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });

  it('search input gets correct value after state change and filters coins', () => {
    wrapMountDeposit.setState({
      value: 'bit',
    });

    const input = wrapMountDeposit.find(`[data-test="search"]`);
    expect(input.props().value).toEqual('bit');

    expect(wrapMountDeposit.find(`[data-test="BTC"]`).length).toEqual(1);
    expect(wrapMountDeposit.find(`[data-test="BCH"]`).length).toEqual(1);
    expect(wrapMountDeposit.find(`.coin`).length).toEqual(2);
  });
});
