import React from 'react';
import cx from 'classnames';
import Deposit from '../../images/deposit.svg';
import Confirmations from '../../images/confirmations.svg';
import Done from '../../images/done.svg';
import styles from '../OrderStatus.scss';
import { I18n } from 'react-i18next';

const LimitOrderStatus = props => {  
  return (
    <I18n ns="translations">
      {t => (
        <div>
          <div
            className={
              props.status === 0
                ? styles.step
                : props.status > 0
                  ? cx(styles.step, styles.done)
                  : cx(styles.step, styles.active)
            }
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title={t('order.bookstatus11')}
          >
            <Deposit />
            <h4>{t('order.bookstatus1')}</h4>
          </div>

          <div
            className={
              props.status === 5
                ? cx(styles.step, styles.active)
                : props.status >= 5
                  ? cx(styles.step, styles.done)
                  : styles.step
            }
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title={t('order.bookstatus21')}
          >
            <Confirmations />
            <h4>{t('order.bookstatus2')}</h4>
          </div>

          <div
            className={props.status === 10 ? cx(styles.step, styles.done) : styles.step }
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title={t('order.bookstatus31')}
          >
            <Done />
            <h4>{t('order.bookstatus3')}</h4>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default LimitOrderStatus;
