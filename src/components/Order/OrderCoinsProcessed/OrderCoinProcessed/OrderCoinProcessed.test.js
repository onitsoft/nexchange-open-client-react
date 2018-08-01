import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import OrderCoinProcessed from './OrderCoinProcessed';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';
window.$ = window.jQuery = require('jquery');

const axiosMock = new MockAdapter(axios);

describe('OrderCoinProcessed', () => {
  beforeEach(() => {
    const mockDataOrder = {
      amount_base: 16030.0,
      amount_quote: 0.45302314,
      timestamp: 1533112989.566057,
      price: 2.826e-5,
      pair: {
        base: order.pair.base.code,
        quote: order.pair.quote.code,
      },
      max_amount_base: 150364.7264127,
      max_amount_quote: 5.33397606,
      min_amount_base: 150.0,
      min_amount_quote: 0.00613576,
    };
    const pairOrder = `${order.pair.base.code}${order.pair.quote.code}`;
    axiosMock.onGet(`https://api.nexchange.io/en/api/v1/get_price/${pairOrder}/`).reply(200, mockDataOrder);

    const mockDataOrderFiat = {
      amount_base: 16030.0,
      amount_quote: 0.45302314,
      timestamp: 1533112989.566057,
      price: 2.826e-5,
      pair: {
        base: orderFiat.pair.base.code,
        quote: orderFiat.pair.quote.code,
      },
      max_amount_base: 150364.7264127,
      max_amount_quote: 5.33397606,
      min_amount_base: 150.0,
      min_amount_quote: 0.00613576,
    };
    const pairOrderFiat = `${orderFiat.pair.base.code}${orderFiat.pair.quote.code}`;
    axiosMock.onGet(`https://api.nexchange.io/en/api/v1/get_price/${pairOrderFiat}/`).reply(200, mockDataOrderFiat);
  });

  it('renders correctly and updates props (deposit and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly and updates props (receive and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (deposit and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (receive and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('copy trigger is called', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />);
    const spy = jest.spyOn(wrapShallow.instance(), 'triggerCopyTooltip');

    expect(spy).not.toHaveBeenCalled();
    wrapShallow
      .dive()
      .find('[data-test="copy-address"]')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
