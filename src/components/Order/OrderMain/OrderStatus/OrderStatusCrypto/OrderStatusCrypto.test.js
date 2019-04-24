import React from 'react';
import { shallow } from 'enzyme';
import OrderStatusCrypto from './OrderStatusCrypto';

describe('OrderStatusCrypto', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatusCrypto status={0} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={5} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={10} />).dive()).toMatchSnapshot();
  });
});
