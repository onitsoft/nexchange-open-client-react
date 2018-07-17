import React from 'react';
import { shallow } from 'enzyme';
import ICO from './ICO';

describe('ICO', () => {
  it('renders correctly', () => {
    expect(shallow(<ICO />)).toMatchSnapshot();
  });
});
