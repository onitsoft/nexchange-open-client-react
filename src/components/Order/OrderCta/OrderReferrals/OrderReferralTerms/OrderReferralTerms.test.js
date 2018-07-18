import React from 'react';
import { shallow } from 'enzyme';
import OrderReferralTerms from './OrderReferralTerms';

describe('OrderReferralTerms', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderReferralTerms />)).toMatchSnapshot();
  });
});
