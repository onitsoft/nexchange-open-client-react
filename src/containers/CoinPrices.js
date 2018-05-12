import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from '../config';

import { fetchPrice } from '../actions/index.js';

class CoinPrices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: {
        ethbtc: null,
        ltcbtc: null,
        bdgbtc: null,
        btcdoge: null,
        ltceth: null,
        dogeeth: null,
        ltcdoge: null,
        btcusd: null,
        ltcusd: null,
        ethusd: null,
      },
      change: {
        ethbtc: null,
        bdgbtc: null,
        ltcbtc: null,
        btcdoge: null,
        ltceth: null,
        dogeeth: null,
        ltcdoge: null,
        btcusd: null,
        ltcusd: null,
        ethusd: null,
      },
    };

    this.fetchPrice = this.fetchPrice.bind(this);
    this.fetchPrices = this.fetchPrices.bind(this);
  }

  componentDidMount() {
    this.fetchPrices();
  }

  fetchPrices() {
    this.fetchPrice('ethbtc');
    this.fetchPrice('bdgbtc');
    this.fetchPrice('ltcbtc');
    this.fetchPrice('btcdoge');
    this.fetchPrice('ltceth');
    this.fetchPrice('ltcdoge');
    this.fetchPrice('btcusd');
    this.fetchPrice('ltcusd');
    this.fetchPrice('ethusd');

    this.timeout = setTimeout(() => {
      this.fetchPrices();
    }, config.PRICE_FETCH_INTERVAL);
  }

  fetchPrice(pair) {
    const url = `${config.API_BASE_URL}/price/${pair}/latest/`;

    axios
      .get(url)
      .then(response => {
        if (!response.data.length) return;

        let rates = this.state.rates,
          rate = parseFloat(response.data[0].ticker.ask);

        if (rates[pair] != null) {
          let change = this.state.change;

          if (rate > rates[pair]) change[pair] = 'up';
          else if (rate < rates[pair]) change[pair] = 'down';

          this.setState({ change });

          setTimeout(() => {
            let change = this.state.change;

            change[pair] = '';
            this.setState({ change });
          }, 3000);
        }

        rates[pair] = rate;
        this.setState({ rates });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className="col-xs-12 text-center">
        <div id="coin-prices">
          <div
            className={`coin-price ${this.state.change['ethbtc']}`}
            ref={el => {
              this.ethbtc = el;
            }}
          >
            <h5>ETH/BTC</h5>
            <h6>
              {this.state.rates.ethbtc
                ? this.state.rates.ethbtc.toFixed(5)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['bdgbtc']}`}
            ref={el => {
              this.ethbtc = el;
            }}
          >
            <h5>BDG/BTC</h5>
            <h6>
              {this.state.rates.bdgbtc
                ? this.state.rates.bdgbtc.toFixed(6)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['ltcbtc']}`}
            ref={el => {
              this.ltcbtc = el;
            }}
          >
            <h5>LTC/BTC</h5>
            <h6>
              {this.state.rates.ltcbtc
                ? this.state.rates.ltcbtc.toFixed(5)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['btcdoge']}`}
            ref={el => {
              this.btcdoge = el;
            }}
          >
            <h5>BTC/DOGE</h5>
            <h6>
              {this.state.rates.btcdoge
                ? this.state.rates.btcdoge.toFixed(1)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['ltceth']}`}
            ref={el => {
              this.ltceth = el;
            }}
          >
            <h5>LTC/ETH</h5>
            <h6>
              {this.state.rates.ltceth
                ? this.state.rates.ltceth.toFixed(5)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['ltcdoge']}`}
            ref={el => {
              this.ltcdoge = el;
            }}
          >
            <h5>LTC/DOGE</h5>
            <h6>
              {this.state.rates.ltcdoge
                ? this.state.rates.ltcdoge.toFixed(1)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['btcusd']}`}
            ref={el => {
              this.btcusd = el;
            }}
          >
            <h5>BTC/USD</h5>
            <h6>
              {this.state.rates.btcusd
                ? this.state.rates.btcusd.toFixed(5)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['ltcusd']}`}
            ref={el => {
              this.ltcusd = el;
            }}
          >
            <h5>LTC/USD</h5>
            <h6>
              {this.state.rates.ltcusd
                ? this.state.rates.ltcusd.toFixed(5)
                : '...'}
            </h6>
          </div>

          <div
            className={`coin-price ${this.state.change['ethusd']}`}
            ref={el => {
              this.ethusd = el;
            }}
          >
            <h5>ETH/USD</h5>
            <h6>
              {this.state.rates.ethusd
                ? this.state.rates.ethusd.toFixed(5)
                : '...'}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCoin: state.selectedCoin,
    amounts: state.amounts,
    price: state.price,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPrice: fetchPrice,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinPrices);
