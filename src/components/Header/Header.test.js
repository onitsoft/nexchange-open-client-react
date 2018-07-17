import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<Header />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
