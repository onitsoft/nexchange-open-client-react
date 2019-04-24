import React from 'react';

import OrderInitial from './OrderInitial/OrderInitial';
import OrderPreReleased from './OrderPreReleased/OrderPreReleased';
import OrderReleased from './OrderReleased/OrderReleased';
import OrderSuccess from './OrderSuccess/OrderSuccess';
import OrderFailure from './OrderFailure/OrderFailure';
import OrderRefunded from './OrderRefunded/OrderRefunded';

import OrderPaymentFiat from './OrderPaymentFiat/OrderPaymentFiat';
import OrderPaidFiat from './OrderPaidFiat/OrderPaidFiat';

import OrderPaymentCrypto from './OrderPaymentCrypto/OrderPaymentCrypto';
import OrderPaidCrypto from './OrderPaidCrypto/OrderPaidCrypto';

// import LimitOrderPayment from './LimitOrderPayment/LimitOrderPayment';
// import LimitOrderPaid from './LimitOrderPaid/LimitOrderPaid';

import { STATUS_CODES, BOOK_STATUS_CODES } from 'StatusCodes';

const OrderState = props => {
  if(!props.isLimitOrder){
    switch (STATUS_CODES[props.order.status_name[0][0]]) {
      case 'INITIAL':
        return <OrderInitial {...props} />;
      case 'PAID_UNCONFIRMED':
        return props.isFiat ? <OrderPaymentFiat {...props} /> : <OrderPaymentCrypto {...props} />;
      case 'PAID':
        return props.isFiat ? <OrderPaidFiat {...props} /> : <OrderPaidCrypto {...props} />;
      case 'PRE_RELEASE':
        return <OrderPreReleased {...props} />;
      case 'RELEASE':
        return <OrderReleased {...props} />;
      case 'COMPLETED':
        return <OrderSuccess {...props} />;
      case 'CANCELLED':
        return <OrderFailure {...props} />;
      case 'REFUNDED':
        return <OrderRefunded {...props} />;
      default:
        return (
          <div className="text-center">
            <h2>Unknown order state, something went wrong</h2>
          </div>
        );
    }
  } else {
    switch (BOOK_STATUS_CODES[props.order.book_status_name[0][0]]) {
      case 'NEW':
        return <OrderInitial {...props} />;
      case 'OPEN':
        return null;
      case 'CLOSED':
        return <OrderSuccess {...props} />;
      default:
        return (
          <div className="text-center">
            <h2>Unknown order state, something went wrong</h2>
          </div>
        );
    }
  }
};

export default OrderState;
