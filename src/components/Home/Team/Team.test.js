import React from 'react';
import { shallow } from 'enzyme';
import Team from './Team';

describe('Team', () => {
  it('renders correctly', () => {
    expect(shallow(<Team />)).toMatchSnapshot();
  });
});
