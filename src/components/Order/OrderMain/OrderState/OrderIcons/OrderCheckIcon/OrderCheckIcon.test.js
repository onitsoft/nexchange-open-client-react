import React from 'react';
import { shallow } from 'enzyme';
import OrderCheckIcon from './OrderCheckIcon';

describe('OrderLinks', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderCheckIcon />)).toMatchSnapshot();
  });
});
