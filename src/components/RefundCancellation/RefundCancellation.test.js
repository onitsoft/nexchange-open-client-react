import React from 'react';
import { shallow } from 'enzyme';
import RefundCancellation from './RefundCancellation';

describe('RefundCancellation', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<RefundCancellation />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
