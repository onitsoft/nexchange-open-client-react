import React from 'react';
import { shallow } from 'enzyme';
import CountdownItem from './CountdownItem';

describe('CountdownItem', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<CountdownItem period="days" count="1" />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
