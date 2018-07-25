import React from 'react';
import { shallow } from 'enzyme';
import OrderRefunded from './OrderRefunded';
import order from 'Mocks/order';

describe('OrderRefunded', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderRefunded order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
