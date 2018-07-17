import React from 'react';
import { shallow } from 'enzyme';
import OrderExpired from './OrderExpired';
window.$ = window.jQuery = require('jquery');
require('Js/bootstrap.min.js');

describe('OrderExpired', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderExpired />)).toMatchSnapshot();
  });
});
