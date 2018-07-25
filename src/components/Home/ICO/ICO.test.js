import React from 'react';
import { shallow } from 'enzyme';
import ICO from './ICO';
import MockDate from 'mockdate';

describe('ICO', () => {
  it('renders correctly', () => {
    MockDate.set(1531839850000);
    const wrapShallow = shallow(<ICO />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
