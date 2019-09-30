import React from 'react';
import { shallow } from 'enzyme';
import Ellipse from './Ellipse';

describe('Ellipse', () => {
  let wrapShallow;

  beforeEach(() => {
    wrapShallow = shallow(<Ellipse coin="btc" style={{ right: -20, left: 20, width: 48, height: 48 }} />);
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('clears interval on unmount', () => {
    const spy = jest.spyOn(window, 'clearTimeout');
    wrapShallow.unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('updates position of top and left', () => {
    wrapShallow.instance().updatePos();

    expect(wrapShallow.state().top === 200 || wrapShallow.state().top === -200).toBeTruthy();
    expect(wrapShallow.state().left === 200 || wrapShallow.state().left === -200).toBeTruthy();
  });
});
