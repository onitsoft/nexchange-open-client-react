import React from 'react';
import { I18n } from 'react-i18next';
import arrow from 'Img/arrow-right-2.svg';
import { Link } from 'react-router-dom';

import styles from './MyOrdersCollapsed.scss';


const MyOrdersCollapsed = props => {
    const myOrdersList = (t) => <div className={styles.list}>
    <div className={styles.orders}>
      {props.myOrders.slice(0, 5).map((order) => {
        const isReverse = order.order_type === 0;
        const base = !isReverse ? 'base' : 'quote';
        const quote = !isReverse ? 'quote' : 'base';
        return (
          <Link to={`/order/${order.unique_reference}`} key={order.unique_reference} className={styles.order}>
            <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair[base].code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair[base].code}</span>
                <span className={styles.amount}>{parseFloat(order[`amount_${base}`]).toString().substring(0,9)}</span>
              </div>
              <img src={arrow} className={styles.arrow} alt="Arrow" />
              <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair[quote].code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair[quote].code}</span>
                <span className={styles.amount}>{parseFloat(order[`amount_${quote}`]).toString().substring(0,9)}</span>
              </div>
          </Link>);
      })}
    </div>
    <div className={`${styles.viewAll}`} 
         onClick={() => props.shouldRedirect ? props.goToMyOrders() : props.expandMyOrders()}>
      <a>{t('orderbookwidget.viewallmyorders')}</a>
    </div>
  </div>;
  return (
        <I18n ns="translations">
            {(t, i18n) => (
                    <div id='myOrders' className={`${styles.container}`}>
                        <div className={`${styles.heading}`}><h4>{t('orderbookwidget.myorders')}</h4></div>
                        <div className={`${styles.content}`}>
                        {_.isEmpty(props.myOrders) 
                            ? <p>{t('orderbookwidget.nomyorders')}</p>
                            : myOrdersList(t)}
                        </div>
                    </div>
            )}
        </I18n>
  );
};

export default MyOrdersCollapsed;
