import React from 'react';
import { shallow } from 'enzyme';
import OrderReferrals from './OrderReferrals';
import order from '#mocks/order';

describe('OrderReferrals', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderReferrals order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
