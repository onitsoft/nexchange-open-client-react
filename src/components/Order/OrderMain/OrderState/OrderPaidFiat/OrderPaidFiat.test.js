import React from 'react';
import { shallow } from 'enzyme';
import OrderPaidFiat from './OrderPaidFiat';

describe('OrderPaidFiat', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderPaidFiat />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
