import React from 'react';
import OrderStatusFiat from './OrderStatusFiat/OrderStatusFiat';
import OrderStatusCrypto from './OrderStatusCrypto/OrderStatusCrypto';
import LimitOrderStatus from './LimitOrderStatus/LimitOrderStatus';
import { STATUS_CODES, BOOK_STATUS_CODES } from 'StatusCodes';
import styles from './OrderStatus.scss';

const OrderStatus = props => {
  let width = '0%';
  const status = props.status;
  if(!props.isLimitOrder) {
    if (STATUS_CODES[status] === 'COMPLETED') {
      width = '100%';
    } else if (STATUS_CODES[status] === 'RELEASE') {
      width = '90%';
    } else if (STATUS_CODES[status] === 'PRE_RELEASE') {
      width = '75%';
    } else if (STATUS_CODES[status] === 'PAID') {
      width = '66.6%';
    } else if (STATUS_CODES[status] === 'PAID_UNCONFIRMED') {
      width = '33.3%';
    } else if (STATUS_CODES[status] === 'INITIAL') {
      width = '33.3%';
    }
  } else {
    if (BOOK_STATUS_CODES[status] === 'CLOSED') {
      width = '100%';
    } else if (BOOK_STATUS_CODES[status] === 'OPEN') {
      width = '66.6%';
    } else if (BOOK_STATUS_CODES[status] === 'NEW') {
      width = '33.3%';
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className={styles.container}>
          {props.isLimitOrder 
          ? <LimitOrderStatus status={props.status} />
          : props.isFiat 
            ? <OrderStatusFiat status={props.status} /> 
            : <OrderStatusCrypto status={props.status} />}
          <div className={`${styles['progress-container']}`}>
            <div className={`${styles['line-info']} progress`}>
              <div className={`${styles['bar-info']} progress-bar`} role="progressbar" style={{ width: width }}>
                <span className="sr-only">{width} Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
