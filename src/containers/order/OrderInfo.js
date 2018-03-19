import React from 'react';

import OrderCrypto from '../order-crypto/Order';
import OrderFiat from '../order-fiat/Order';

const OrderInfo = props => {
    if (props.isFiat) {
        return <OrderFiat order={props.order} {...props} />;
    } else {
        return <OrderCrypto order={props.order} {...props} />
    }
};

export default OrderInfo;