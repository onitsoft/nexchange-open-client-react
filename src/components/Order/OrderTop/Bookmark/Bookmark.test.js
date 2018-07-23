import React from 'react';
import { shallow } from 'enzyme';
import Bookmark from './Bookmark';

describe('Bookmark', () => {
  it('renders correctly', () => {
    expect(shallow(<Bookmark />)).toMatchSnapshot();
  });
});
