import React from 'react';
import { shallow } from 'enzyme';
import OrderInitialCrypto from './OrderInitialCrypto';
import order from 'Mocks/order';

describe('OrderInitialCrypto', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderInitialCrypto order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
