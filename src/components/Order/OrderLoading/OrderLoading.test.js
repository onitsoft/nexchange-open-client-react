import React from 'react';
import { shallow } from 'enzyme';
import OrderLoading from './OrderLoading';

describe('OrderLoading', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderLoading />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
