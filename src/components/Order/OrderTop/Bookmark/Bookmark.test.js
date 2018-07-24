import React from 'react';
import { shallow } from 'enzyme';
import Bookmark from './Bookmark';

describe('Bookmark', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<Bookmark />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
