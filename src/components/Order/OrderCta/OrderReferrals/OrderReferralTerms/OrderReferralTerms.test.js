import React from 'react';
import { shallow } from 'enzyme';
import OrderReferralTerms from './OrderReferralTerms';

describe('OrderReferralTerms', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderReferralTerms />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
