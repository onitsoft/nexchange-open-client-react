import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import OrderInitial from './OrderInitial';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';

describe('OrderInitial', () => {
  let wrapShallowFiat, wrapShallowCrypto;

  beforeEach(() => {
    MockDate.set(1531839850000);
    order.created_on = '2018-07-17T18:03:33.793300+03:00';

    wrapShallowCrypto = shallow(<OrderInitial order={order} />);
    wrapShallowFiat = shallow(<OrderInitial order={orderFiat} />);
  });

  it('renders correctly', () => {
    expect(wrapShallowCrypto).toMatchSnapshot();
    expect(wrapShallowFiat).toMatchSnapshot();
  });
});
