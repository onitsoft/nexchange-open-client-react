import React from 'react';
import { shallow } from 'enzyme';
import OrderRefundFailed from './OrderRefundFailed';
import order from 'Mocks/order';

describe('OrderRefundFailed', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderRefundFailed order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
