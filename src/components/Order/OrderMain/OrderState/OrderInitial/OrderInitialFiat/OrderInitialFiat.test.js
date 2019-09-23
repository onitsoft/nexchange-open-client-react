import React from 'react';
import { shallow } from 'enzyme';
import OrderInitialFiat from './OrderInitialFiat';
import order from '#mocks/order';

describe('OrderInitialFiat', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderInitialFiat order={order} />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
