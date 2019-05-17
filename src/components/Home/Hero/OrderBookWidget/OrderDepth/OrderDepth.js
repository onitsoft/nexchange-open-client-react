import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OrderDepthItem from './OrderDepthItem/OrderDepthItem';
import styles from './OrderDepth.scss';


class OrderDepth extends Component {
  render() {
    const depth = this.props.orderBook.sellDepth.concat(this.props.orderBook.buyDepth)
    let maxSize;
    if(!_.isEmpty(depth)) {
      maxSize = _.maxBy(depth, function(depthItem) {
        return depthItem.size;
      }).size;
    }


    let sellDepth = [];
    if(!_.isEmpty(this.props.orderBook.sellDepth)){
      sellDepth = this.props.orderBook.sellDepth.map((depthItem) => {
        /* eslint max-len: ["error", { "code": 200 }] */ 
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='SELL' maxSize={maxSize} data-test='sell-depth-item'/>;
      });
    }
    let buyDepth = [];
    if(!_.isEmpty(this.props.orderBook.buyDepth)){
      buyDepth = this.props.orderBook.buyDepth.map((depthItem) => {
        /* eslint max-len: ["error", { "code": 200 }] */ 
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='BUY' maxSize={maxSize} data-test='buy-depth-item'/>;
      });
    }

    let spreadValue;
    const bestBid = this.props.orderBook.sellDepth[this.props.orderBook.sellDepth.length -1];
    const bestAsk = this.props.orderBook.buyDepth[0];

    if(bestBid && bestAsk) {
      spreadValue = (bestAsk.rate - bestBid.rate) / ((bestAsk.rate + bestBid.rate)/2) * 100;
      spreadValue = parseFloat(Math.round(spreadValue * 100) / 100).toFixed(2);
    }
    return (
      <I18n ns="translations">
        {t => (
        <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles.wrapper}`}>
         <div className={`${styles.container}`}>
          <div className={`${styles.heading}`}><h4>{t('orderbookwidget.orderbook')}</h4></div>
          <div className={`${styles.content}`}>
            <div className={`${styles.spread}`}><span data-test='spread'>{!_.isEmpty(spreadValue) ? `Spread ${spreadValue}%` : ''}</span></div>
            <div className={`${styles.header}`}>
              <span className={``}>{t('orderbookwidget.size', {coin: this.props.selectedCoin.receive})}</span>
              <span className={``}>{t('orderbookwidget.price', {coin: this.props.selectedCoin.deposit})}</span>
            </div>
            <div className={`${styles.data}`}>
              {_.isEmpty(sellDepth) ? <p>{t('orderbookwidget.nosellorders')}</p> : sellDepth}
              {_.isEmpty(buyDepth) ? <p>{t('orderbookwidget.nobuyorders')}</p> : buyDepth}
            </div>
          </div>
        </div>
      </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, orderBook }) => ({ selectedCoin, orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDepth);
