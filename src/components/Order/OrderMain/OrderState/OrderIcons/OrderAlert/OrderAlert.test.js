import React from 'react';
import { shallow } from 'enzyme';
import OrderAlert from './OrderAlert';

describe('OrderAlert', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderAlert />)).toMatchSnapshot();
  });
});
