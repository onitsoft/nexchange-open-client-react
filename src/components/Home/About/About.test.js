import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('About', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<About />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
