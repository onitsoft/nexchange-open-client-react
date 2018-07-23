import React from 'react';
import { shallow } from 'enzyme';
import OrderPaidFiat from './OrderPaidFiat';

describe('OrderPaidFiat', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderPaidFiat />)).toMatchSnapshot();
  });
});
