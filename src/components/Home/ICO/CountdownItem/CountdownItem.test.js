import React from 'react';
import { shallow } from 'enzyme';
import CountdownItem from './CountdownItem';

describe('CountdownItem', () => {
  it('renders correctly', () => {
    expect(shallow(<CountdownItem period="days" count="1" />)).toMatchSnapshot();
  });
});
