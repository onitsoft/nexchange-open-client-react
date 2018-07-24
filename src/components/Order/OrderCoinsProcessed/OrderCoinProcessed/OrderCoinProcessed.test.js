import React from 'react';
import { shallow } from 'enzyme';
import OrderCoinProcessed from './OrderCoinProcessed';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';
window.$ = window.jQuery = require('jquery');

describe('OrderCoinProcessed', () => {
  it('renders correctly and updates props (deposit and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly and updates props (receive and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (deposit and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (receive and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('copy trigger is called', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />);
    const spy = jest.spyOn(wrapShallow.instance(), 'triggerCopyTooltip');

    expect(spy).not.toHaveBeenCalled();
    wrapShallow
      .dive()
      .find('[data-test="copy-address"]')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
