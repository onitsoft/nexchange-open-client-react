import React from 'react';

import isFiatOrder from 'Utils/isFiatOrder';
import OrderInitialFiat from './OrderInitialFiat/OrderInitialFiat';
import OrderInitialCrypto from './OrderInitialCrypto/OrderInitialCrypto';

import useCountdown from 'Utils/useCountdown'

const OrderInitial = (props) => {
  const { minutes, seconds } = useCountdown(() => props.order.payment_deadline);

  if (isFiatOrder(props.order)) {
    return <OrderInitialFiat time={`${minutes}:${seconds}`} {...props} />;
  } else {
    return <OrderInitialCrypto time={`${minutes}:${seconds}`} {...props} />;
  }
};

export default OrderInitial
