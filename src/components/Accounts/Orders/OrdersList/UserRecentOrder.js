import React from 'react';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';
import { I18n } from 'react-i18next';

import config from 'Config';
import styles from './RecentOrders.scss';
import arrow from 'Img/arrow-right-2.svg';

const UserRecentOrder = (props) => {
  const { order, index } = props

  return (
    <I18n ns="translations">
    {(t, { i18n }) => (
     <div className={styles.row} key={`order-${index}`}>
        <div className={`${styles.col} col col-xs-2 col-ms-3`}>
          <div className={styles.middle}>
            <p className={styles.ago}>{new moment(order.created_on).locale(`${i18n.language}`).fromNow()}</p>
          </div>
        </div>

        <div className={`${styles.col} col col-xs-7 col-ms-7`}>
          <div className={`${styles.col} col-xs-4 col-ms-5 col-lg-4`}>
            <div className={styles.middle}>
              <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair.quote.code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair.quote.code}</span>
                <span className={styles.amount}>{Math.round(parseFloat(order.amount_quote) * 1000) / 1000}</span>
              </div>
            </div>
          </div>

          <div className={`${styles.col} col-xs-3 col-ms-2`}>
            <div className={styles.middle}>
              <img src={arrow} className={styles.arrow} alt="Arrow" />
            </div>
          </div>

          <div className={`${styles.col} col-xs-4 col-ms-5 col-lg-6`}>
            <div className={styles.middle}>
              <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair.base.code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair.base.code}</span>
                <span className={styles.amount}>{Math.round(parseFloat(order.amount_base) * 1000) / 1000}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.col} col col-xs-3 col-ms-2`}>
          <div className={styles.middle}>
            <a
              href={`${config.API_BASE_URL}/orders/${order.unique_reference}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}>
              {t('recentorders.3')}
            </a>
          </div>
        </div>
      </div>
      )}
    </I18n>
 )

}

export default UserRecentOrder;