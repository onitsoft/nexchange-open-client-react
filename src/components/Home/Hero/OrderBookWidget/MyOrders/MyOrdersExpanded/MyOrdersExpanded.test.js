import React from 'react';
import { shallow } from 'enzyme';
import MyOrdersExpanded from './MyOrdersExpanded';

describe('MyOrdersExpanded', () => {
  let wrapShallow;

  beforeEach(() => {
    wrapShallow = shallow(<MyOrdersExpanded myOrders={[]} collapseMyOrders={jest.fn()} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});

