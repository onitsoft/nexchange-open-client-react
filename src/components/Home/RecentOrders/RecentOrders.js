import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales.min.js';
import 'moment/locale/en-gb';
import _ from 'lodash';

import urlParams from 'Utils/urlParams';
import config from 'Config';

import LoadingComponent from './LoadingComponent/LoadingComponent';
import styles from './RecentOrders.scss';
import arrow from 'Img/arrow-right-2.svg';

const RecentOrders = ({ coinsInfo }) => {
  const [orders, setOrders] = useState([]);

  const fetchRecentOrders = () => {
    let params = urlParams(),
      depositCurrencies = coinsInfo.filter(coin => coin.is_quote_of_enabled_pair),
      receiveCurrencies = coinsInfo.filter(coin => coin.is_base_of_enabled_pair);

    if (params && params.hasOwnProperty('test')) {
      depositCurrencies = coinsInfo.filter(coin => coin.is_quote_of_enabled_pair_for_test);
      receiveCurrencies = coinsInfo.filter(coin => coin.is_base_of_enabled_pair_for_test);
    }

    depositCurrencies = depositCurrencies.map(coin => coin.code);
    receiveCurrencies = receiveCurrencies.map(coin => coin.code);

    axios
      .get(`${config.API_BASE_URL}/orders/?page=1&page_size=${config.RECENT_ORDERS_COUNT}`)
      .then(response => {
        let resOrders = response.data.results.filter(({ pair }) => {
          return params && params.hasOwnProperty('test')
            ? true
            : _.includes(receiveCurrencies, pair.base.code) && _.includes(depositCurrencies, pair.quote.code);
        });

        setOrders(resOrders);
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      fetchRecentOrders();
    }, config.RECENT_ORDERS_INTERVAL);
  };

  useEffect(() => {
    if (coinsInfo.length > 0) {
      fetchRecentOrders(coinsInfo);
    }
  }, [coinsInfo]);

  let ordersArray = orders.map(order => {
    return (
      <I18n ns="translations" key={order.unique_reference}>
        {(t, { i18n }) => (
          <div className={styles.row}>
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
                  className={styles.btn}
                >
                  {t('recentorders.3')}
                </a>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  });

  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.container}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="title">{t('recentorders.1')}</h2>
                <div className="recent-orders-container">
                  {ordersArray.length < 1 ? <LoadingComponent isLoading={true} /> : ordersArray}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

const mapStateToProps = ({ coinsInfo }) => ({ coinsInfo });

export default connect(mapStateToProps)(RecentOrders);
