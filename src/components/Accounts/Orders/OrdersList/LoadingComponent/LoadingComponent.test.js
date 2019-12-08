import React from 'react';
import { shallow } from 'enzyme';
import LoadingComponent from './LoadingComponent';

describe('LoadingComponent', () => {
  it('renders correctly', () => {
    expect(shallow(<LoadingComponent isLoading={true} />)).toMatchSnapshot();
    expect(shallow(<LoadingComponent isLoading={false} error="Some error" />).dive()).toMatchSnapshot();
    expect(shallow(<LoadingComponent />)).toMatchSnapshot();
  });
});
