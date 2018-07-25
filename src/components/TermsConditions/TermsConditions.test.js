import React from 'react';
import { shallow } from 'enzyme';
import TermsConditions from './TermsConditions';

describe('TermsConditions', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<TermsConditions />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
