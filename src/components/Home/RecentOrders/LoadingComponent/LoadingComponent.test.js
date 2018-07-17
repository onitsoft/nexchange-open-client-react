import React from 'react';
import { shallow } from 'enzyme';
import LoadingComponent from './LoadingComponent';

describe('LoadingComponent', () => {
  it('renders correctly', () => {
    expect(shallow(<LoadingComponent isLoading={true} />)).toMatchSnapshot();
    expect(shallow(<LoadingComponent isLoading={false} error="Some error" />)).toMatchSnapshot();
    expect(shallow(<LoadingComponent />)).toMatchSnapshot();
  });
});
