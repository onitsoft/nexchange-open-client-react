import React from 'react';
import cx from 'classnames';
import Deposit from '../../images/deposit.svg';
import Confirmations from '../../images/confirmations.svg';
import Done from '../../images/done.svg';
import STATUS_CODES from 'StatusCodes';
import styles from '../OrderStatus.scss';

const OrderStatusCrypto = props => {
  return (
    <div>
      <div
        className={
          [0, 8].indexOf(props.status) > -1
            ? styles.step
            : props.status > 11
              ? cx(styles.step, styles.done)
              : cx(styles.step, styles.active)
        }
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="In this step we are waiting for your deposit."
      >
        <Deposit />
        <h4>1. Awaiting deposit</h4>
      </div>

      <div
        className={
          STATUS_CODES[props.status] === 'PAID_UNCONFIRMED'
            ? cx(styles.step, styles.active)
            : props.status >= 13
              ? cx(styles.step, styles.done)
              : styles.step
        }
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="Your order is on the blockchain,
                we are now waiting for the required number of
                confirmations before you can receive your funds."
      >
        <Confirmations />
        <h4>2. Awaiting confirmations</h4>
      </div>

      <div
        className={
          props.status === 13 || props.status === 14
            ? cx(styles.step, styles.active)
            : props.status >= 15
              ? props.status === 15
                ? cx(styles.step, styles.active)
                : cx(styles.step, styles.done)
              : styles.step
        }
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="We got the funds and now have transferred our funds to you."
      >
        <Done />
        <h4>3. All done</h4>
      </div>
    </div>
  );
};

export default OrderStatusCrypto;
