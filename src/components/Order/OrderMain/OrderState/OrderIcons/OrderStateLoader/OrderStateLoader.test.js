import React from 'react';
import { shallow } from 'enzyme';
import OrderStateLoader from './OrderStateLoader';

describe('OrderStateLoader', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStateLoader />)).toMatchSnapshot();
  });
});
