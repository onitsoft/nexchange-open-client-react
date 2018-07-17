import React from 'react';
import { shallow } from 'enzyme';
import OrderLoading from './OrderLoading';

describe('OrderLoading', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderLoading />)).toMatchSnapshot();
  });
});
