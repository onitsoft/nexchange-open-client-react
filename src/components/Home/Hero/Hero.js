import React, { useEffect } from 'react';
import { I18n, Trans } from 'react-i18next';

import ExchangeWidget from './ExchangeWidget/ExchangeWidget';
import OrderBookWidget from './OrderBookWidget/OrderBookWidget';
import OrderBookDisabled from './OrderBookWidget/OrderBookDisabled';
import CoinPrices from './CoinPrices/CoinPrices';
import ErrorAlert from './ErrorAlert/ErrorAlert';
import Config from 'Config';

import urlParams from 'Utils/urlParams';
import styles from './Hero.scss';

const Hero = props => {
  const { changeOrderMode, location, orderMode, store } = props;

  useEffect(() => {
    const params = urlParams();
    if (params && params.hasOwnProperty('advanced') && orderMode === 'INSTANT') {
      changeOrderMode('ORDER_BOOK');
      window.gtag('event', 'Entered advanced mode via URL', { event_category: 'Order Book', event_label: `` });
    }
    if (location.search.indexOf('advanced') === -1) {
      changeOrderMode('INSTANT');
    }
  }, [location.search.indexOf('advanced')]);

  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.hero}>
          <ErrorAlert />

          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className={styles.brand}>
                  <h1>{t('hero.1')}</h1>
                  <Trans i18nKey="hero.2">
                    <h2>
                      Simple. <span className="text-green">Secure</span>. Transparent.
                    </h2>
                  </Trans>
                </div>
              </div>

              <div className={styles.widget}>
                {orderMode === 'INSTANT' ? (
                  <ExchangeWidget {...props} store={store} />
                ) : Config.ADVANCED_MODE_ENABLED ? (
                  <OrderBookWidget {...props} store={store} />
                ) : (
                  <OrderBookDisabled {...props} />
                )}
              </div>
            </div>
          </div>

          <CoinPrices />
        </div>
      )}
    </I18n>
  );
};

export default Hero;
