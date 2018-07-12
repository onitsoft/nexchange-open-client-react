import React from 'react';
import { shallow } from 'enzyme';
import CoinsDropdown from './CoinsDropdown.js';
import coinsInfo from 'Mocks/currency.js';

describe('CoinsDropdown', () => {
  let wrapShallowDeposit, wrapShallowReceive;

  beforeEach(() => {
    wrapShallowDeposit = shallow(<CoinsDropdown type="deposit" onClick={jest.fn()} coinsInfo={coinsInfo} />);
    wrapShallowReceive = shallow(<CoinsDropdown type="receive" onClick={jest.fn()} coinsInfo={coinsInfo} />);
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
});
