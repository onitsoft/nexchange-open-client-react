import React from 'react';
import { shallow } from 'enzyme';
import OrderInitialCrypto from './OrderInitialCrypto';
import order from 'Mocks/order';

describe('OrderInitialCrypto', () => {
  let wrapShallow;

  beforeEach(() => {
    wrapShallow = shallow(<OrderInitialCrypto order={order} />);
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});
