import React from 'react';
import { I18n } from 'react-i18next';
import arrow from 'Img/arrow-right-2.svg';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';
import { Link } from 'react-router-dom';

import styles from './MyOrdersExpanded.scss';


const MyOrdersExpanded = props => {
    const myOrdersList = (i18n) => 
    <div className={`col-xs-12 ${styles.list}`}>
      <div className={`${styles.heading}`}><h2>My Orders</h2></div>
      <div className={styles.orders}>
        {props.myOrders.map((order) => {
          const status = order.book_status_name[0][1];
          return (
            <Link to={`/order/${order.unique_reference}`} key={order.unique_reference} className={styles.order}>
              <div className={`${styles.status} ${styles[status]}`}><span>{status}</span></div>
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
            </Link>);
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
                      {_.isEmpty(props.myOrders) 
                          ? <div className={styles['no-history']}><p>No order history...</p></div>
                          : myOrdersList(i18n)}
                    </div>
            )}
        </I18n>
  );
};

export default MyOrdersExpanded;
