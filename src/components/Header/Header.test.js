import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header', () => {
  let wrapShallow;

  beforeEach(() => {
    window.ga = jest.fn();
    wrapShallow = shallow(<Header />);
  });

  it('renders correctly', () => {
    expect(wrapShallow.dive()).toMatchSnapshot();
  });

  it('correct class and image is shown on home page', () => {
    expect(
      wrapShallow
        .dive()
        .find('[data-test="header"]')
        .hasClass('home')
    ).toBe(true);
    expect(
      wrapShallow
        .dive()
        .find('[data-test="logo"]')
        .props().src
    ).toBe('/img/logo-white.svg');
  });

  it('correct class and image is shown on non-home pages', () => {
    window.history.pushState('', '', '/order/ASDAD');
    wrapShallow = shallow(<Header />);

    expect(
      wrapShallow
        .dive()
        .find('[data-test="header"]')
        .hasClass('home')
    ).toBe(false);
    expect(
      wrapShallow
        .dive()
        .find('[data-test="logo"]')
        .props().src
    ).toBe('/img/logo.svg');
  });
});
