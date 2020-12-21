import React from 'react';
import { shallow } from 'enzyme';
import CoinsDropdown from './CoinsDropdown.js';
import coinsInfo from 'Mocks/currency.js';

const setup = ({
  selectedCoin = {
    deposit: null,
    receive: null,
    orderByAddress: false,
    prev: {
      deposit: null,
      receive: null,
    },
    lastSelected: 'deposit',
    selectedByUser: {
      deposit: false,
      receive: false,
    },
  },
}) => ({ selectedCoin });

describe('CoinsDropdown', () => {
  let wrapShallowDeposit, wrapShallowReceive;

  beforeEach(() => {
    const props = setup({});
    wrapShallowDeposit = shallow(<CoinsDropdown type="deposit" onClick={jest.fn()} coinsInfo={coinsInfo} {...props} />).dive();
    wrapShallowReceive = shallow(<CoinsDropdown type="receive" onClick={jest.fn()} coinsInfo={coinsInfo} {...props} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallowDeposit).toMatchSnapshot();
    expect(wrapShallowReceive).toMatchSnapshot();
  });

  it('dropdown contains correct coins (deposit)', () => {
    for (const coin of coinsInfo) {
      if (coin.is_quote_of_enabled_pair && !coin.is_crypto) {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowDeposit.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });

  it('dropdown contains correct coins (receive)', () => {
    for (const coin of coinsInfo) {
      if (coin.is_base_of_enabled_pair) {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(1);
      } else {
        expect(wrapShallowReceive.find(`[data-test="${coin.code}"]`).length).toEqual(0);
      }
    }
  });

  it('search input gets correct value after typing and filters coins (deposit)', () => {
    let input = wrapShallowDeposit.find('[data-test="search"]');

    input.simulate('change', {
      target: { value: 'usd' },
    });

    input = wrapShallowDeposit.find(`[data-test="search"]`);

    expect(wrapShallowDeposit.state().value).toEqual('usd');
    expect(input.props().value).toEqual('usd');

    expect(wrapShallowDeposit.find(`[data-test="USD"]`).length).toEqual(1);
    expect(wrapShallowDeposit.find(`.coin`).length).toEqual(1);
  });

  it('search input gets correct value after typing and filters coins (receive)', () => {
    let input = wrapShallowReceive.find(`[data-test="search"]`);

    input.simulate('change', {
      target: { value: 'bit' },
    });

    input = wrapShallowReceive.find(`[data-test="search"]`);

    expect(wrapShallowReceive.state().value).toEqual('bit');
    expect(input.props().value).toEqual('bit');

    expect(wrapShallowReceive.find(`[data-test="BTC"]`).length).toEqual(1);
    expect(wrapShallowReceive.find(`[data-test="BCH"]`).length).toEqual(1);
    expect(wrapShallowReceive.find(`[data-test="BDG"]`).length).toEqual(1);
    expect(wrapShallowReceive.find(`.coin`).length).toEqual(3);
  });

  it('search input gets emptied on clear', () => {
    let input = wrapShallowReceive.find('[data-test="search"]');

    input.simulate('change', {
      target: { value: 'bit' },
    });

    wrapShallowReceive.find('[data-test="clear"]').simulate('click');
    input = wrapShallowReceive.find('[data-test="search"]');

    expect(wrapShallowReceive.state().value).toEqual('');
    expect(input.props().value).toEqual('');
  });
});
