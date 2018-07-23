import React from 'react';
import { shallow } from 'enzyme';
import OrderStatus from './OrderStatus';
import order from 'Mocks/order';

describe('OrderStatus', () => {
  it('renders correctly', () => {
    expect(shallow(<OrderStatus order={order} isFiat={true} status={0} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={8} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={11} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={12} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={13} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={14} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={15} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={true} status={16} />)).toMatchSnapshot();

    expect(shallow(<OrderStatus order={order} isFiat={false} status={0} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={8} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={11} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={12} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={13} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={14} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={15} />)).toMatchSnapshot();
    expect(shallow(<OrderStatus order={order} isFiat={false} status={16} />)).toMatchSnapshot();
  });
});
