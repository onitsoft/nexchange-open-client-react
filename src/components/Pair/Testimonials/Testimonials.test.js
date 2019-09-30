import React from 'react';
import { shallow, mount } from 'enzyme';
import Testimonials from './Testimonials';

describe('Testimonials', () => {
  let wrapShallow, wrapMount;

  beforeEach(() => {
    wrapShallow = shallow(<Testimonials />).dive();
    wrapMount = mount(<Testimonials />);
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('next button working correctly', () => {
    const spy = jest.spyOn(wrapMount.instance(), 'goPrev');
    wrapMount.instance().forceUpdate();

    expect(spy).not.toHaveBeenCalled();
    wrapMount.find('[data-test="prev"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('prev button working correctly', () => {
    const spy = jest.spyOn(wrapMount.instance(), 'goNext');
    wrapMount.instance().forceUpdate();

    expect(spy).not.toHaveBeenCalled();
    wrapMount.find('[data-test="next"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
