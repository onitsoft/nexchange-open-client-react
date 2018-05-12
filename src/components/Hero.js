import React, { Component } from 'react';

import ExchangeWidget from '../containers/ExchangeWidget';
import CoinPrices from '../containers/CoinPrices';
import ErrorAlert from '../components/ErrorAlert';

let scrollToElement;

class Hero extends Component {
  componentDidMount() {
    scrollToElement = require('scroll-to-element');
  }

  render() {
    return (
      <div id="hero">
        <ErrorAlert />

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="brand">
                <h1>Exchange Cryptocurrencies</h1>
                <h2>
                  Simple. <span className="text-green">Secure</span>.
                  Transparent.
                </h2>
              </div>
            </div>

            <ExchangeWidget />
            <CoinPrices />
          </div>
        </div>

        <div id="mouse-scroll" onClick={() => scrollToElement('#about')}>
          <span className="arrow-1" aria-hidden="true" />
          <span className="arrow-2" aria-hidden="true" />
          <span className="arrow-3" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default Hero;
