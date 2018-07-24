import React from 'react';
import { shallow } from 'enzyme';
import OrderPaymentCrypto from './OrderPaymentCrypto';
import order from 'Mocks/order';
import orderNoTx from 'Mocks/orderNoTx';

describe('OrderPaymentCrypto', () => {
  it('renders correctly and handles props update', () => {
    const wrapShallow = shallow(<OrderPaymentCrypto order={orderNoTx} />);
    expect(wrapShallow.dive()).toMatchSnapshot();

    wrapShallow.setProps({ order });
    expect(wrapShallow.dive()).toMatchSnapshot();
  });
});
