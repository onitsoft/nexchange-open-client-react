import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';

import ExchangeWidget from './ExchangeWidget/ExchangeWidget';
import OrderBookWidget from './OrderBookWidget/OrderBookWidget';
import OrderBookDisabled from './OrderBookWidget/OrderBookDisabled';
import CoinPrices from './CoinPrices/CoinPrices';
import ErrorAlert from './ErrorAlert/ErrorAlert';
import Config from 'Config'; 

import urlParams from 'Utils/urlParams';
import styles from './Hero.scss';

class Hero extends Component {
  constructor(props){
    super();
    
    this.state = {
      orderBookActive: true,
    };
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const params = urlParams();
    if (params && params.hasOwnProperty('advanced') && this.props.orderMode === 'INSTANT') {
      this.props.changeOrderMode('ORDER_BOOK');
      window.gtag('event', 'Entered advanced mode via URL', {event_category: 'Order Book', event_label: ``});
    } if(this.props.location.search.indexOf('advanced') !== -1 && nextProps.location.search.indexOf('advanced') === -1) {
      this.props.changeOrderMode('INSTANT');
    }
  }

  changeOrderMode() {
    if(this.props.orderMode === 'INSTANT'){
      this.props.changeOrderMode('ORDER_BOOK');
      window.gtag('event', 'Order Mode Switch', {event_category: 'Order Book', event_label: ``});
    } else if(this.props.orderMode === 'ORDER_BOOK'){
      this.props.changeOrderMode('INSTANT');
    } else {
      this.props.changeOrderMode('INSTANT');
    }
  }

  render() { 
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
                  { this.props.orderMode === 'INSTANT'
                    ? <ExchangeWidget {...this.props}  store={this.props.store} />
                    : Config.ADVANCED_MODE_ENABLED ?
                      <OrderBookWidget {...this.props}  store={this.props.store} />
                    : <OrderBookDisabled {...this.props}/>}
                </div>
              </div>
            </div>

            <CoinPrices />
          </div>
        )}
      </I18n>
    );
  }
}

export default Hero;
