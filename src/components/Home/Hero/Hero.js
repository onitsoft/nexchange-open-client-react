import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';

import ExchangeWidget from './ExchangeWidget/ExchangeWidget';
import CoinPrices from './CoinPrices/CoinPrices';
import ErrorAlert from './ErrorAlert/ErrorAlert';
import BuyWithCreditCard from './BuyWithCreditCard/BuyWithCreditCard';

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

                <BuyWithCreditCard className="visible-sm visible-md visible-lg" />
                <ExchangeWidget store={this.props.store} />
                <BuyWithCreditCard className="visible-xs" />
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
