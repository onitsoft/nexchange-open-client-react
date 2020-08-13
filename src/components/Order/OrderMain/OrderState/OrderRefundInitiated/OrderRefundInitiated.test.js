import React from 'react';
import { shallow } from 'enzyme';
import OrderRefundInitiated from './OrderRefundInitiated';
import order from 'Mocks/order';

describe('OrderRefundInitiated', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderRefundInitiated order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
