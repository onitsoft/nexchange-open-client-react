import React from 'react';
import { shallow } from 'enzyme';
import orderFiat from 'Mocks/orderFiat';
import order from 'Mocks/order';
import MinMax from './MinMax';

describe('MinMax', () => {
  it('renders correctly correct amounts', () => {
    const wrapShallow = shallow(<MinMax min={1} max={2} amount={1.5} home="true" order={order} type="Deposit" />).dive();
    const wrapShallowHome = shallow(<MinMax min={1} max={2} amount={1.5} order={order} type="Deposit" />).dive();
    const wrapShallowFiatDeposit = shallow(<MinMax min={1} max={2} amount={1.5} order={orderFiat} type="Deposit" />);
    const wrapShallowFiatReceive = shallow(<MinMax min={1} max={2} amount={1.5} order={orderFiat} type="Receive" />).dive();

    expect(wrapShallow).toMatchSnapshot();
    expect(wrapShallowHome).toMatchSnapshot();
    expect(wrapShallowFiatDeposit).toMatchSnapshot();
    expect(wrapShallowFiatReceive).toMatchSnapshot();
  });

  it('renders correctly too low amounts', () => {
    const wrapShallow = shallow(<MinMax min={1} max={2} amount={0.5} home="true" order={order} type="Deposit" />).dive();
    const wrapShallowHome = shallow(<MinMax min={1} max={2} amount={0.5} order={order} type="Deposit" />).dive();
    const wrapShallowFiat = shallow(<MinMax min={1} max={2} amount={0.5} order={orderFiat} type="Deposit" />).dive();

    expect(wrapShallow).toMatchSnapshot();
    expect(wrapShallowHome).toMatchSnapshot();
    expect(wrapShallowFiat).toMatchSnapshot();
  });

  it('renders correctly too high amounts', () => {
    const wrapShallow = shallow(<MinMax min={1} max={2} amount={3} home="true" order={order} type="Deposit" />).dive();
    const wrapShallowHome = shallow(<MinMax min={1} max={2} amount={3} order={order} type="Deposit" />).dive();
    const wrapShallowFiat = shallow(<MinMax min={1} max={2} amount={3} order={orderFiat} type="Deposit" />).dive();

    expect(wrapShallow).toMatchSnapshot();
    expect(wrapShallowHome).toMatchSnapshot();
    expect(wrapShallowFiat).toMatchSnapshot();
  });
});
