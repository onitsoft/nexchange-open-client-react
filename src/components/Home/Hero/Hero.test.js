import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Hero', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<Hero />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
