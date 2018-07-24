import React from 'react';
import { shallow } from 'enzyme';
import CoinsDropdown from './CoinsDropdown.js';
import coinsInfo from 'Mocks/currency.js';

describe('CoinsDropdown', () => {
  let wrapShallowDeposit, wrapShallowReceive;

  beforeEach(() => {
    window.history.pushState('', '', 'http://localhost/?test=true');
    wrapShallowDeposit = shallow(<CoinsDropdown type="deposit" onClick={jest.fn()} coinsInfo={coinsInfo} />).dive();
    wrapShallowReceive = shallow(<CoinsDropdown type="receive" onClick={jest.fn()} coinsInfo={coinsInfo} />).dive();
  });

  afterEach(() => {
    window.history.pushState('', '', 'http://localhost/');
  });

  it('dropdown contains correct coins (deposit and test)', () => {
    for (const coin of coinsInfo) {
      if (coin.is_quote_of_enabled_pair_for_test) {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });

  it('dropdown contains correct coins (receive and test)', () => {
    for (const coin of coinsInfo) {
      if (coin.is_base_of_enabled_pair_for_test) {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });
});
