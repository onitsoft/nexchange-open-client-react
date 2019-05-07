import React from 'react';
import cx from 'classnames';
import Deposit from '../../images/deposit.svg';
import Confirmations from '../../images/confirmations.svg';
import Done from '../../images/done.svg';
import { STATUS_CODES } from 'StatusCodes';
import styles from '../OrderStatus.scss';
import { I18n } from 'react-i18next';

const OrderStatusCrypto = props => {
  return (
    <I18n ns="translations">
      {t => (
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
            data-original-title={t('order.status11')}
          >
            <Deposit />
            <h4>{t('order.status1')}</h4>
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
            data-original-title={t('order.status21')}
          >
            <Confirmations />
            <h4>{t('order.status2')}</h4>
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
            data-original-title={t('order.status31')}
          >
            <Done />
            <h4>{t('order.status3')}</h4>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default OrderStatusCrypto;
