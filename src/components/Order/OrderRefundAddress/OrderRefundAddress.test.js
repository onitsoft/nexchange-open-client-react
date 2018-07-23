import React from 'react';
import { shallow } from 'enzyme';
import OrderRefundAddress from './OrderRefundAddress';
import order from 'Mocks/order';

describe('OrderRefundAddress', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderRefundAddress order={order} isFiat={true} status={11} />)).toMatchSnapshot();
  });
});
