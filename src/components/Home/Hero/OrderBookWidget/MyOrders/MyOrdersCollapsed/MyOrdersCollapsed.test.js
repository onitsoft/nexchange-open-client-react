import React from 'react';
import { shallow } from 'enzyme';
import MyOrdersCollapsed from './MyOrdersCollapsed';

describe('MyOrdersCollapsed', () => {
  let wrapShallow;

  beforeEach(() => {
    wrapShallow = shallow(<MyOrdersCollapsed myOrders={[]} expandMyOrders={jest.fn()} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});

