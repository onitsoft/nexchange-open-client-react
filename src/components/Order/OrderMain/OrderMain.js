import React from 'react';

import OrderStatus from './OrderStatus/OrderStatus';
import OrderState from './OrderState/OrderState';
import isFiatOrder from 'Utils/isFiatOrder';

const OrderMain = props => {
  const isFiat = isFiatOrder(props.order);

  return (
    <div className="col-xs-12">
      <div className="box">
        <OrderStatus isFiat={isFiat} status={props.order.status_name[0][0]} />
        <OrderState isFiat={isFiat} {...props} />
      </div>
    </div>
  );
};

export default OrderMain;
