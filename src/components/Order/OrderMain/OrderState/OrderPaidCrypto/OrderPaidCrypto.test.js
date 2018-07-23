import React from 'react';
import { shallow } from 'enzyme';
import OrderPaidCrypto from './OrderPaidCrypto';
import order from 'Mocks/order';
import orderNoTx from 'Mocks/orderNoTx';

describe('OrderPaidCrypto', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderPaidCrypto order={order} />)).toMatchSnapshot();
    expect(shallow(<OrderPaidCrypto order={orderNoTx} />)).toMatchSnapshot();
  });
});
