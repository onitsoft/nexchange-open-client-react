import React from 'react';
import { shallow } from 'enzyme';
import OrderPreReleased from './OrderPreReleased';
import order from 'Mocks/order';

describe('OrderPreReleased', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderPreReleased order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
