import React from 'react';
import { shallow } from 'enzyme';
import OrderState from './OrderState';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';

const STATUS_CODES = {
  0: 'CANCELLED',
  8: 'REFUNDED',
  11: 'INITIAL',
  12: 'PAID_UNCONFIRMED',
  13: 'PAID',
  14: 'PRE_RELEASE',
  15: 'RELEASE',
  16: 'COMPLETED',
};

describe('OrderState', () => {
  it('renders correctly', () => {
    const orderPaidUnconfirmed = { ...order, status_name: [[12, STATUS_CODES[12]]] };
    const orderPaid = { ...order, status_name: [[13, STATUS_CODES[13]]] };
    const orderPreRelease = { ...order, status_name: [[14, STATUS_CODES[14]]] };
    const orderRelease = { ...order, status_name: [[15, STATUS_CODES[15]]] };
    const orderCompleted = { ...order, status_name: [[16, STATUS_CODES[16]]] };
    const orderCancelled = { ...order, status_name: [[0, STATUS_CODES[0]]] };
    const orderRefunded = { ...order, status_name: [[8, STATUS_CODES[8]]] };
    const unknownState = { ...order, status_name: [[9, STATUS_CODES[9]]] };

    const orderPaidUnconfirmedFiat = { ...orderFiat, status_name: [[12, STATUS_CODES[12]]] };
    const orderPaidFiat = { ...orderFiat, status_name: [[13, STATUS_CODES[13]]] };

    expect(shallow(<OrderState order={order} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderPaidUnconfirmed} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderPaid} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderPreRelease} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderRelease} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderCompleted} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderCancelled} isFiat={false} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderRefunded} isFiat={false} />)).toMatchSnapshot();

    expect(shallow(<OrderState order={orderPaidUnconfirmedFiat} isFiat={true} />)).toMatchSnapshot();
    expect(shallow(<OrderState order={orderPaidFiat} isFiat={true} />)).toMatchSnapshot();

    expect(shallow(<OrderState order={unknownState} isFiat={false} />)).toMatchSnapshot();
  });
});
