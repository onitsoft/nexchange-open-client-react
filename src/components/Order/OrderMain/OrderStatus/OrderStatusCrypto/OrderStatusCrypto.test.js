import React from 'react';
import { shallow } from 'enzyme';
import OrderStatusCrypto from './OrderStatusCrypto';

describe('OrderStatusCrypto', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatusCrypto status={0} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={8} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={11} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={12} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={13} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={14} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={15} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={16} />)).toMatchSnapshot();
  });
});
