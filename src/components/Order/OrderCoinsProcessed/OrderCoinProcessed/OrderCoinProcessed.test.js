import React from 'react';
import { shallow, mount } from 'enzyme';
import OrderCoinProcessed from './OrderCoinProcessed';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';

describe('OrderCoinProcessed', () => {
  it('renders correctly and updates props (deposit and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />);
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly and updates props (receive and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={order} />);
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (deposit and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={orderFiat} />);
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (receive and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={orderFiat} />);
    expect(wrapShallow).toMatchSnapshot();
  });

  it('copy trigger is called', () => {
    const spy = jest.spyOn(OrderCoinProcessed.prototype, 'triggerCopyTooltip');
    const wrapShallow = mount(<OrderCoinProcessed type="Deposit" order={order} />);

    expect(spy).not.toHaveBeenCalled();
    wrapShallow.find('[data-test="copy-address"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
