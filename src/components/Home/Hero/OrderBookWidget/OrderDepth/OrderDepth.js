import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';

import OrderDepthItem from './OrderDepthItem/OrderDepthItem';
import styles from './OrderDepth.scss';


class OrderDepth extends PureComponent {
  state = {
  };

  render() {
    let sellDepth = [];
    if(!_.isEmpty(this.props.sellDepth)){
      sellDepth = this.props.sellDepth.map((depthItem) => {
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='SELL'/>;
      });
    }
    let buyDepth = [];
    if(!_.isEmpty(this.props.buyDepth)){
      buyDepth = this.props.buyDepth.map((depthItem) => {
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='BUY'/>;
      });
    }

    return (
      <I18n ns="translations">
        {t => (
         <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles.container}`}>
          <div className={`${styles.header}`}>
            <span className={``}>{`Size (${this.props.selectedCoins.receive})`}</span>
            <span className={``}>{`Price (${this.props.selectedCoins.deposit})`}</span>
          </div>
            {_.isEmpty(sellDepth) ? <span>{'Currently there are no buy orders for this market..'}</span> : sellDepth}
            <div className={styles.separator}></div>
            {_.isEmpty(buyDepth) ? <span>{'Currently there are no buy orders for this market..'}</span> : buyDepth}
        </div>
        )}
      </I18n>
    );
  }
}

export default OrderDepth;
