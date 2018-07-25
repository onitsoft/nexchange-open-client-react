import React from 'react';
import { shallow } from 'enzyme';
import OrderLinks from './OrderLinks';
import order from 'Mocks/order';

describe('OrderLinks', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderLinks txId="123" coin="BTC" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
