import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from 'Config';
import { fetchPrice } from 'Actions/index.js';
import styles from './CoinPrices.scss';

class CoinPrices extends Component {
  state = {
    rates: {
      ethbtc: '',
      ltcbtc: '',
      bdgbtc: '',
      btcdoge: '',
      ltceth: '',
      dogeeth: '',
      ltcdoge: '',
      btcusd: '',
      ltcusd: '',
      ethusd: '',
    },
    change: {
      ethbtc: '',
      bdgbtc: '',
      ltcbtc: '',
      btcdoge: '',
      ltceth: '',
      dogeeth: '',
      ltcdoge: '',
      btcusd: '',
      ltcusd: '',
      ethusd: '',
    },
  };

  componentDidMount() {
    this.fetchPrices();
  }

  fetchPrices = () => {
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
  };

  fetchPrice = pair => {
    const url = `${config.API_BASE_URL}/price/${pair}/latest/`;

    axios
      .get(url)
      .then(response => {
        if (!response.data.length) return;

        const rates = this.state.rates;
        const rate = parseFloat(response.data[0].ticker.ask);

        if (rates[pair] !== '') {
          let change = this.state.change;

          if (rate > rates[pair]) change[pair] = styles.up;
          else if (rate < rates[pair]) change[pair] = styles.down;

          this.setState({ change });
        }

        rates[pair] = rate;
        this.setState({ rates });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className="container">
            <Link to={{ pathname: "/", search: "?pair=ETHBTC" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ethbtc']}`}
                ref={el => {
                  this.ethbtc = el;
                }}
              >
                <h5>
                  ETH/BTC <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ethbtc ? this.state.rates.ethbtc.toFixed(5) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=BDGBTC" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['bdgbtc']}`}
                ref={el => {
                  this.ethbtc = el;
                }}
              >
                <h5>
                  BDG/BTC <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.bdgbtc ? this.state.rates.bdgbtc.toFixed(6) : '...'}</h6>
              </div>
             </Link>

            <Link to={{ pathname: "/", search: "?pair=LTCBTC" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ltcbtc']}`}
                ref={el => {
                  this.ltcbtc = el;
                }}
              >
                <h5>
                  LTC/BTC <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ltcbtc ? this.state.rates.ltcbtc.toFixed(5) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=BTCDOGE" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['btcdoge']}`}
                ref={el => {
                  this.btcdoge = el;
                }}
              >
                <h5>
                  BTC/DOGE <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.btcdoge ? this.state.rates.btcdoge.toFixed(1) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=LTCETH" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ltceth']}`}
                ref={el => {
                  this.ltceth = el;
                }}
              >
                <h5>
                  LTC/ETH <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ltceth ? this.state.rates.ltceth.toFixed(5) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=LTCDOGE" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ltcdoge']}`}
                ref={el => {
                  this.ltcdoge = el;
                }}
              >
                <h5>
                  LTC/DOGE <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ltcdoge ? this.state.rates.ltcdoge.toFixed(1) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=BTCUSD" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['btcusd']}`}
                ref={el => {
                  this.btcusd = el;
                }}
              >
                <h5>
                  BTC/USD <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.btcusd ? this.state.rates.btcusd.toFixed(5) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=LTCUSD" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ltcusd']}`}
                ref={el => {
                  this.ltcusd = el;
                }}
              >
                <h5>
                  LTC/USD <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ltcusd ? this.state.rates.ltcusd.toFixed(5) : '...'}</h6>
              </div>
            </Link>

            <Link to={{ pathname: "/", search: "?pair=ETHUSD" }} replace={false}>
              <div
                className={`${styles['coin-price']} ${this.state.change['ethusd']}`}
                ref={el => {
                  this.ethusd = el;
                }}
              >
                <h5>
                  ETH/USD <span className={styles.arrow} />
                </h5>
                <h6>{this.state.rates.ethusd ? this.state.rates.ethusd.toFixed(5) : '...'}</h6>
              </div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, amounts, price }) => ({ selectedCoin, amounts, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinPrices);
