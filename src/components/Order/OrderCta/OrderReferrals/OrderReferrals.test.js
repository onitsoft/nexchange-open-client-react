import React from 'react';
import { shallow } from 'enzyme';
import OrderReferrals from './OrderReferrals';
import order from 'Mocks/order';

describe('OrderReferrals', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderReferrals order={order} />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
