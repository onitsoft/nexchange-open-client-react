import React from 'react';
import { shallow } from 'enzyme';
import OrderStatusFiat from './OrderStatusFiat';

describe('OrderStatusFiat', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatusFiat status={0} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={8} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={11} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={12} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={13} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={14} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={15} />).dive()).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={16} />).dive()).toMatchSnapshot();
  });
});
