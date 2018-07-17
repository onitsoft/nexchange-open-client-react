import React from 'react';
import { shallow } from 'enzyme';
import OrderReleased from './OrderReleased';
import orderNoTx from 'Mocks/orderNoTx';
import order from 'Mocks/order';

describe('OrderReleased', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderReleased order={orderNoTx} />);
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });
});
