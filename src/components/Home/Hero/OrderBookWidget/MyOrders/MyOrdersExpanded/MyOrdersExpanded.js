import React from 'react';
import { I18n } from 'react-i18next';
import arrow from 'Img/arrow-right-2.svg';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';

import styles from './MyOrdersExpanded.scss';


const MyOrdersExpanded = props => {
    const myOrdersList = (i18n) => <div className={`col-xs-12 ${styles.list}`}>
    <div className={styles.orders}>
      {props.myOrders.map((order) => {
        return (
          <div key={order.unique_reference} className={styles.order}>
            <span className={styles.timeAgo}>{`${new moment(order.created_at).locale(`${i18n.language}`).fromNow()}`}</span>
            <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair.base.code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair.base.code}</span>
                <span className={styles.amount}>{parseFloat(order.amount_base).toFixed(5)}</span>
              </div>
              <div className={styles.arrow}><img src={arrow} alt="Arrow" /></div>
              <div className={styles.coin}>
                <i className={`${styles.icon} coin-icon cc ${order.pair.quote.code}`} />
                <span className={`${styles.code} hidden-xs hidden-ms hidden-sm`}>{order.pair.quote.code}</span>
                <span className={styles.amount}>{parseFloat(order.amount_quote).toFixed(5)}</span>
              </div>
          </div>);
      })}
    </div>
  </div>;
  return (
        <I18n ns="translations">
            {(t, i18n) => (
                    <div id='myOrders' className={`${styles.container}`}>                    
                      <button 
                        type="button" 
                        className={`${styles.collapse}`}
                        data-dismiss="modal" 
                        aria-hidden="true" 
                        onClick={() => props.collapseMyOrders()}>
                          <i className="material-icons">clear</i>
                        </button>
                      <div className={`col-xs-12 ${styles.heading}`}><h2>My Orders</h2></div>
                      {_.isEmpty(props.myOrders) 
                          ? <p>No order history...</p>
                          : myOrdersList(i18n)}
                    </div>
            )}
        </I18n>
  );
};

export default MyOrdersExpanded;
