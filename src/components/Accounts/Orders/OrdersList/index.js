import React from 'react';
import { connect } from 'react-redux';
import {  I18n } from 'react-i18next';

import 'moment/locale/en-gb';
import UserRecentOrder from './UserRecentOrder'

import LoadingComponent from './LoadingComponent/LoadingComponent';
import styles from './RecentOrders.scss';

const OrdersList = (props, { t, i18n }) => {
  const { orders } = props

  let orderlist = null;
  if (orders) {
    if (orders.length > 1) {
      orderlist = orders.map((order, index) => (
                    <UserRecentOrder order={order} index={index} />
                  ))
    }
    else {
      orderlist = null
    }
  }
  else {
    orderlist = <LoadingComponent isLoading={true} />
  }
  return (
    <I18n ns="translations">
      {(t, { i18n }) => (
        <div className={styles.container}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2>{t('recentorders.1')}</h2>
                <div className="recent-orders-container">
                  {orderlist ? orderlist :
                    <p>{t('recentorders.4')}</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
}

const mapStateToProps = ({ coinsInfo }) => ({ coinsInfo });

export default connect(mapStateToProps)(OrdersList);
