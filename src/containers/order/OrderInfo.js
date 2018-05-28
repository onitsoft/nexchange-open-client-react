import React from 'react';

import '../../css/order-crypto.scss';
import '../../css/order-fiat.scss';

import OrderInitial from './OrderInitial';
import OrderPreReleased from './OrderPreReleased';
import OrderReleased from './OrderReleased';
import OrderSuccess from './OrderSuccess';
import OrderFailure from './OrderFailure';
import OrderRefunded from './OrderRefunded';

import OrderPaymentFiat from '../order-fiat/OrderPayment';
import OrderPaidFiat from '../order-fiat/OrderPaid';
import OrderStatusFiat from '../order-fiat/OrderStatus';

import OrderPaymentCrypto from '../order-crypto/OrderPayment';
import OrderPaidCrypto from '../order-crypto/OrderPaid';
import OrderStatusCrypto from '../order-crypto/OrderStatus';

import STATUS_CODES from '../../statusCodes';
import isFiatOrder from '../../helpers/isFiatOrder';

const OrderInfo = props => {
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
        {order}

        {isFiat ? <OrderStatusFiat status={props.order.status_name[0][0]} /> : <OrderStatusCrypto status={props.order.status_name[0][0]} />}
      </div>
    </div>
  );
};

export default OrderInfo;
