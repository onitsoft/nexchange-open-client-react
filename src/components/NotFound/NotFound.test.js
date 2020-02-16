import React from 'react';
import { mount } from 'enzyme';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders correctly', () => {
    const goBack = jest.fn();
    const wrapper = mount(<NotFound history={goBack} />);
    expect(wrapper).toMatchSnapshot();
  });
  // it('should call history.push', () => {
  //     const wrapper = mount(<MyComponent />);
  //     // perform your test
  // });
});
