import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import axios from 'axios'
import config from 'Config'

import styles from './PnlTracking.scss';

const { API_BASE_URL } = config

class PnlTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRate: null,
      creationRate: null,
    }
  }

  UNSAFE_componentWillMount() {
    const fetchRates = () => {
      const order = this.props.order;
      const request =`${API_BASE_URL}/price/${order.pair.name}/latest`;
      axios.get(request)
      .then((response) => {
          if(response && response.data && response.data[0] && response.data[0].ticker.ask) {
            const { ask } = response.data[0].ticker
            const ASK = parseFloat(ask, 10)
            this.setState({currentRate: 1/ASK});
          }
      })
      .catch((error) => {
      });
    }
    fetchRates();
    this.interval = setInterval(() => {
      fetchRates();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  UNSAFE_componentWillUpdate() {
    const order = this.props.order;
    if(!this.state.creationRate && order && order.price) {      
      const creationRate = 1/order.price.rate;
      this.setState({creationRate});
    }
  }

  render() {
    const quote = this.props.order.pair.base.code;
    const coin = _.find(this.props.coinsInfo, { 'code': quote });
    if(!coin) {
      return null;
    }
    const order = this.props.order;
    let change;
    if(order.status_name[0][1] === 'INITIAL') {
      change = 0;
    } else {
      // Round off to two decimal digits (10000 / 100)
      change = Math.round((1 - (this.state.currentRate / this.state.creationRate)) * 10000) / 100
    }
    const className = (change >= 100) ? 'profit' : 'loss';
    return (
      <I18n ns="translations">
        {(t) => (
        <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
          <div className={`${styles.container} ${styles[className]}`}>
          <div className={styles.top}>
            <span className="bold">{t('pnl.profit')} / {t('pnl.loss')}</span>
            <div className={styles.coin}>
                <div className="col-xs-3 text-center">
                  <i className={`cc ${coin.code} ${coin.code}`} />
                </div>
                <div className={`col-xs-9 text-capitalize ${styles.coinName}`}>
                  <p>{coin.name}</p>
                </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <span className={styles.amount}>{parseFloat(order.amount_base).toFixed(6)} {order.pair.base.code}</span>
            <div className={styles.change}>
              <div className={styles.changeIconContainer}>
                <div className={styles.changeIcon}></div>
              </div>
              <span className={styles.change}>{change}%</span>
            </div>
          </div>
          </div>
        </div>
        )}
      </I18n>
    );
  };
}

const mapStateToProps = ({ coinsInfo }) => ({ coinsInfo });

export default connect(mapStateToProps)(PnlTracking);

