import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<Footer />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
