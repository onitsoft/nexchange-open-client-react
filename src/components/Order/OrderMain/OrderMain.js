import React from 'react';

import OrderStatus from './OrderStatus/OrderStatus';
import OrderState from './OrderState/OrderState';
import isFiatOrder from 'Utils/isFiatOrder';

const OrderMain = props => {
  const isFiat = isFiatOrder(props.order);
  const isLimitOrder = props.order.isLimitOrder;
  return (
    <div className="col-xs-12">
      <div className="box">
        <OrderStatus
          isLimitOrder={isLimitOrder} 
          isFiat={isFiat}
          status={!isLimitOrder ? props.order.status_name[0][0] : props.order.book_status_name[0][0]} />
        <OrderState isLimitOrder={isLimitOrder} isFiat={isFiat} {...props} />
      </div>
    </div>
  );
};

export default OrderMain;
