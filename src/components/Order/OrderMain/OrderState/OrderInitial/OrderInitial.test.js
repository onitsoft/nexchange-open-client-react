import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import OrderInitial from './OrderInitial';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';
import orderExpired from 'Mocks/orderExpired';

describe('OrderInitial', () => {
  let wrapShallowFiat, wrapShallowCrypto, wrapShallowExpired;

  beforeEach(() => {
    MockDate.set(1531839850000);
    order.created_on = '2018-07-17T18:03:33.793300+03:00';

    wrapShallowCrypto = shallow(<OrderInitial order={order} />);
    wrapShallowFiat = shallow(<OrderInitial order={orderFiat} />);
    wrapShallowExpired = shallow(<OrderInitial order={orderExpired} />);
  });

  it('renders correctly', () => {
    expect(wrapShallowCrypto).toMatchSnapshot();
    expect(wrapShallowFiat).toMatchSnapshot();
    expect(wrapShallowExpired).toMatchSnapshot();
  });

  it('clears interval on unmount', () => {
    const spy = jest.spyOn(window, 'clearInterval');
    wrapShallowCrypto.unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('tick calculates new time and sets it', () => {
    jest.useFakeTimers();

    const spy = jest.spyOn(OrderInitial.prototype, 'tick');
    shallow(<OrderInitial order={order} />);

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(3);
    }, 3100);

    jest.runTimersToTime(4000);
  });
});
