import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs } from 'Actions';
import CoinInput from '../Home/Hero/ExchangeWidget/CoinInput/CoinInput';
import ChangeWithdrawnCoin from './ChangeWithdrawnCoin/ChangeWithdrawnCoin';

import styles from './Convert.scss';


class Convert extends Component {

  componentDidMount() {
    this.props.fetchCoinDetails();
    this.props.fetchPairs();
  }

  componentDidUpdate(prevProps, prevState) {
    // Detect coin change by link
    const oldUrlParams = new URLSearchParams(prevProps.location.search);
    const oldPairParam = oldUrlParams.get('pair');
    const newUrlParams = new URLSearchParams(this.props.location.search);
    const newPairParam = newUrlParams.get('pair');
    if(newPairParam && newPairParam !== oldPairParam) {
        this.props.fetchCoinDetails();
        this.props.fetchPairs();
    }
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container"> 
              <div className="col-xs-12">
                <div className={styles.brand}>
                  <h1>Heading 1</h1>
                  <h2>Heading 2</h2>
                </div>
              </div>   
              <div className={`col-xs-12 ${styles.convert}`}>
                <p className={`${styles.updatedDate}`}>Updated: 10.09.2019 17:55</p>
                <div className={`col-xs-12 ${styles.inputs}`}>
                    <CoinInput type="deposit" isConvert={true}/>
                    <span>{"< >"}</span>
                    <CoinInput type="receive" isConvert={true}/>
                </div>
                <div className={`col-xs-12`}>
                  <div className={styles.currentRate}>
                    <h4>Current exchange rate BTC to ETH is:</h4>
                    <div className={styles.rates}>
                      <h3>1.05 BTC</h3>
                      <h3> = </h3>
                      <h3>1.05 ETH</h3>
                    </div>
                    <button className={`${styles.exchangeBtn} btn btn-block btn-primary proceed`}>Exchange</button>
                  </div>
                </div>
                <ChangeWithdrawnCoin/>
              </div>
          </div>
        </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price, error }) => ({ selectedCoin, price, error });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPairs, fetchCoinDetails }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Convert);