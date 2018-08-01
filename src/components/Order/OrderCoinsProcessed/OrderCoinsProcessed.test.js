import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import OrderCoinsProcessed from './OrderCoinsProcessed';
import order from 'Mocks/order';

const axiosMock = new MockAdapter(axios);

describe('OrderCoinsProcessed', () => {
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
  });

  it('renders correctly', () => {
    expect(shallow(<OrderCoinsProcessed order={order} />)).toMatchSnapshot();
  });
});
