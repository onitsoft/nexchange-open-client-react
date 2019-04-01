import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';

import ExchangeWidget from './ExchangeWidget/ExchangeWidget';
import OrderBookWidget from './OrderBookWidget/OrderBookWidget';
import CoinPrices from './CoinPrices/CoinPrices';
import ErrorAlert from './ErrorAlert/ErrorAlert';

import styles from './Hero.scss';

class Hero extends Component {
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

                { this.props.orderBook && this.props.orderBook.active
                  ? <div><a>Go Basic</a><OrderBookWidget store={this.props.store} /></div>
                  : <div><a>Go Pro</a><ExchangeWidget store={this.props.store} /></div> }
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
