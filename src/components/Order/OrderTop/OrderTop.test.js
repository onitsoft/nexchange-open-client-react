import React from 'react';
import { shallow } from 'enzyme';
import OrderTop from './OrderTop';
import order from 'Mocks/order';

describe('OrderTop', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderTop order={order} />)).toMatchSnapshot();
  });
});
