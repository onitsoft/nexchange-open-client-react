import React from 'react';
import { shallow } from 'enzyme';
import OrderStatusFiat from './OrderStatusFiat';

describe('OrderStatusFiat', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatusFiat status={0} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={8} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={11} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={12} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={13} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={14} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={15} />)).toMatchSnapshot();
    expect(shallow(<OrderStatusFiat status={16} />)).toMatchSnapshot();
  });
});
