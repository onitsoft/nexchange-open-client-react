import React, { Component } from 'react';

import ExchangeWidget from './ExchangeWidget/ExchangeWidget';
import CoinPrices from './CoinPrices/CoinPrices';
import ErrorAlert from './ErrorAlert/ErrorAlert';
import Header from 'Components/Header/Header';

import styles from './Hero.scss';

class Hero extends Component {
  render() {
    return (
      <div className={styles.hero}>
        <Header />
        <ErrorAlert />

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className={styles.brand}>
                <h1>Exchange Cryptocurrencies</h1>
                <h2>
                  Simple. <span className="text-green">Secure</span>. Transparent.
                </h2>
              </div>
            </div>

            <ExchangeWidget store={this.props.store} />
          </div>
        </div>

        <CoinPrices />
      </div>
    );
  }
}

export default Hero;
