import React from 'react';
import { shallow } from 'enzyme';
import OrderPaidCrypto from './OrderPaidCrypto';
import order from 'Mocks/order';
import orderNoTx from 'Mocks/orderNoTx';

describe('OrderPaidCrypto', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderPaidCrypto order={order} />).dive();
    const wrapShallowNoTx = shallow(<OrderPaidCrypto order={orderNoTx} />).dive();

    expect(wrapShallow).toMatchSnapshot();
    expect(wrapShallowNoTx).toMatchSnapshot();
  });
});
