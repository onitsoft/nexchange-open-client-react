import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<NotFound />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
