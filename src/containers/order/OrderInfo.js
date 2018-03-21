import React from 'react';
import Helpers from '../../helpers';

import OrderCrypto from '../order-crypto/Order';
import OrderFiat from '../order-fiat/Order';

const OrderInfo = props => (
    <div className="col-xs-12">
        <div className="box">
            {Helpers.isFiatOrder(props.order) ?
                <OrderFiat order={props.order} {...props} /> :
                <OrderCrypto order={props.order} {...props} />
            }
        </div>
    </div>
);

export default OrderInfo;