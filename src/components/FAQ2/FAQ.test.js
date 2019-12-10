import React from 'react';
import { shallow } from 'enzyme';
import FAQ from './FAQ';

describe('FAQ', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<FAQ />);
    expect(wrapShallow).toMatchSnapshot();

    wrapShallow.setState({ show: true });
    expect(wrapShallow.dive()).toMatchSnapshot();

    wrapShallow.setProps({ show: false }).setState({ show: false });
    expect(wrapShallow.dive()).toMatchSnapshot();
  });
});
