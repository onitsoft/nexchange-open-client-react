import React from 'react';
import { shallow } from 'enzyme';
import OrderSuccess from './OrderSuccess';
import order from '#mocks/order';

describe('OrderSuccess', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderSuccess order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
