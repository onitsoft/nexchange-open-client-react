import React from 'react';
import { shallow } from 'enzyme';
import Home from '../containers/Home';

describe('Home', () => {
  const home = shallow(<Home />);

  it('renders correctly', () => {
    expect(home).toMatchSnapshot();
  });
});
