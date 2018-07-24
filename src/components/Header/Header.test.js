import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  let wrapShallow;

  beforeEach(() => {
    window.ga = jest.fn();
    wrapShallow = shallow(<Header />);
  });

  it('renders correctly', () => {
    expect(wrapShallow.dive()).toMatchSnapshot();
  });

  it('FAQ modal opens and closes', () => {
    expect(
      wrapShallow
        .dive()
        .find('FAQ')
        .props().show
    ).toBe(false);

    wrapShallow
      .dive()
      .find('[data-test="faq-btn"]')
      .simulate('click');

    expect(
      wrapShallow
        .dive()
        .find('FAQ')
        .props().show
    ).toBe(true);

    wrapShallow.instance().closeFaqModal();
    wrapShallow.dive().update();

    expect(
      wrapShallow
        .dive()
        .find('FAQ')
        .props().show
    ).toBe(false);
  });

  it('Support modal opens and closes', () => {
    expect(
      wrapShallow
        .dive()
        .find('Connect(Support)')
        .props().show
    ).toBe(false);
    wrapShallow
      .dive()
      .find('[data-test="support-btn"]')
      .simulate('click');
    expect(
      wrapShallow
        .dive()
        .find('Connect(Support)')
        .props().show
    ).toBe(true);

    wrapShallow.instance().closeSupportModal();
    wrapShallow.dive().update();

    expect(
      wrapShallow
        .dive()
        .find('Connect(Support)')
        .props().show
    ).toBe(false);
  });

  it('GA event is sent on ICO link click', () => {
    const spy = jest.spyOn(window, 'ga');
    wrapShallow
      .dive()
      .find('[data-test="ico-link"]')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('GA event is sent on API link click', () => {
    const spy = jest.spyOn(window, 'ga');
    wrapShallow
      .dive()
      .find('[data-test="api-link"]')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
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
