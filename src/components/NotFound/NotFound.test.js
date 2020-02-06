import React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders correctly', () => {
    const goBack = jest.fn();
    const wrapper = shallow(<NotFound history={goBack} />);
    expect(wrapper).toMatchSnapshot();
  });
  // it('should call history.push', () => {
  //     const wrapper = mount(<MyComponent />);
  //     // perform your test
  // });
});
