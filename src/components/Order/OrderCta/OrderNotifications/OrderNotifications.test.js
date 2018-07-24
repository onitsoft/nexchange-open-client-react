import React from 'react';
import { shallow } from 'enzyme';
import OrderNotifications from './OrderNotifications';

describe('OrderNotifications', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(<OrderNotifications email="" message={{ text: 'Hello', error: false }} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });
});
