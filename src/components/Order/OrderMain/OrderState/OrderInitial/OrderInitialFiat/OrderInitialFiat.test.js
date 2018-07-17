import React from 'react';
import { shallow } from 'enzyme';
import OrderInitialFiat from './OrderInitialFiat';
import order from 'Mocks/order';

describe('OrderInitialFiat', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderInitialFiat order={order} />)).toMatchSnapshot();
  });
});
