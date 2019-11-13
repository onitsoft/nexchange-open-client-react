import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import axios from 'axios'

import styles from './PnlTracking.scss';

class PnlTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRate: null,
      creationRate: null,
    }
  }

  componentWillMount() {
    const fetchRates = () => {
      const order = this.props.order;
      const request =`https://api.nexchange.io/en/api/v1/price/${order.pair.name}/latest`;
      axios.get(request)
      .then((response) => {
          if(response && response.data && response.data[0] && response.data[0].ticker.ask) {
            this.setState({currentRate: 1/response.data[0].ticker.ask});
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

  componentWillUpdate() {
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
      change = Math.round((this.state.creationRate * 100)/this.state.currentRate);
    }
    const className = (change >= 100) ? 'profit' : 'loss';
    return (
      <I18n ns="translations">
        {(t) => (
        <div className={`col-sm-12 com-md-4 col-lg-4`}>
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

