import React from 'react';
import { shallow } from 'enzyme';
import OrderAlert from './OrderAlert';

describe('OrderAlert', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderAlert />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
