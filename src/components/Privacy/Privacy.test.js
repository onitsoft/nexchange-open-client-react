import React from 'react';
import { shallow } from 'enzyme';
import Privacy from './Privacy';

describe('Privacy', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<Privacy />);
    expect(wrapShallow).toMatchSnapshot();
  });
});
