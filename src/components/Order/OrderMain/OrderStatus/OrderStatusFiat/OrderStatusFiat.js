import React from 'react';
import styles from '../OrderStatus.scss';

const OrderStatusFiat = props => {
  return (
    <div>
      <div
        className={[0, 8].indexOf(props.status) > -1 ? 'step' : props.status > 11 ? 'step done' : 'step active'}
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="In this step we are waiting for your deposit."
      >
        <span className="glyphicon glyphicon-save" aria-hidden="true" />
        <h4>1. Awaiting deposit</h4>
      </div>

      <div
        className={STATUS_CODES[props.status] === 'PAID_UNCONFIRMED' ? 'step active' : props.status >= 13 ? 'step done' : 'step'}
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="We have received your funds and are now waiting
                for proof of residence and government issued ID verification."
      >
        <span className="glyphicon glyphicon-user" aria-hidden="true" />
        <h4>2. Awaiting verification</h4>
      </div>

      <div
        className={
          props.status === 13 || props.status === 14
            ? 'step active'
            : props.status >= 15
              ? props.status === 15
                ? 'step active'
                : 'step done'
              : 'step'
        }
        data-toggle="tooltip"
        data-placement="top"
        title=""
        data-original-title="We got the funds and now have transferred our funds to you."
      >
        <span className="glyphicon glyphicon-ok" aria-hidden="true" />
        <h4>3. All done</h4>
      </div>
    </div>
  );
};

export default OrderStatusFiat;
