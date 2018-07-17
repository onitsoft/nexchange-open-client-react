import React from 'react';
import { shallow } from 'enzyme';
import OrderCoinsProcessed from './OrderCoinsProcessed';
import order from 'Mocks/order';

describe('OrderCoinsProcessed', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderCoinsProcessed order={order} />)).toMatchSnapshot();
  });
});
