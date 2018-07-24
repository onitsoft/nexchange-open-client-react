import React from 'react';
import { shallow } from 'enzyme';
import OrderStatusCrypto from './OrderStatusCrypto';

describe('OrderStatusCrypto', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatusCrypto status={0} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={8} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={11} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={12} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={13} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={14} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={15} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusCrypto status={16} />).dive()).toMatchSnapshot();
  });
});
