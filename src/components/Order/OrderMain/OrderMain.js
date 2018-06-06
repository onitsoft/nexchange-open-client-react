import React from 'react';

// import '../../css/order-crypto.scss';
// import '../../css/order-fiat.scss';

import OrderInitial from './OrderInitial/OrderInitial';
import OrderPreReleased from './OrderPreReleased/OrderPreReleased';
import OrderReleased from './OrderReleased/OrderReleased';
import OrderSuccess from './OrderSuccess/OrderSuccess';
import OrderFailure from './OrderFailure/OrderFailure';
import OrderRefunded from './OrderRefunded/OrderRefunded';

import OrderPaymentFiat from './OrderFiat/OrderPayment/OrderPayment';
import OrderPaidFiat from './OrderFiat/OrderPaid/OrderPaid';
import OrderStatusFiat from './OrderFiat/OrderStatus/OrderStatus';

import OrderPaymentCrypto from './OrderCrypto/OrderPayment/OrderPayment';
import OrderPaidCrypto from './OrderCrypto/OrderPaid/OrderPaid';
import OrderStatusCrypto from './OrderCrypto/OrderStatus/OrderStatus';

import STATUS_CODES from 'StatusCodes';
import isFiatOrder from 'Utils/isFiatOrder';

const OrderMain = props => {
  const isFiat = isFiatOrder(props.order);
  let order;

  switch (STATUS_CODES[props.order.status_name[0][0]]) {
    case 'INITIAL':
      order = <OrderInitial {...props} />;
      break;
    case 'PAID_UNCONFIRMED':
      order = isFiat ? <OrderPaymentFiat {...props} /> : <OrderPaymentCrypto {...props} />;
      break;
    case 'PAID':
      order = isFiat ? <OrderPaidFiat {...props} /> : <OrderPaidCrypto {...props} />;
      break;
    case 'PRE_RELEASE':
      order = <OrderPreReleased {...props} />;
      break;
    case 'RELEASE':
      order = <OrderReleased {...props} />;
      break;
    case 'COMPLETED':
      order = <OrderSuccess {...props} />;
      break;
    case 'CANCELLED':
      order = <OrderFailure {...props} />;
      break;
    case 'REFUNDED':
      order = <OrderRefunded {...props} />;
      break;
    default:
      order = (
        <div className="text-center">
          <h2>Unknown order state, something went wrong</h2>
        </div>
      );
  }

  return (
    <div className="col-xs-12">
      <div className="box">
        {isFiat ? <OrderStatusFiat status={props.order.status_name[0][0]} /> : <OrderStatusCrypto status={props.order.status_name[0][0]} />}
        {order}
      </div>
    </div>
  );
};

export default OrderMain;
