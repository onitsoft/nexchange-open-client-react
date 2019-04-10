import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
         <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-6 ${styles.container}`}>
          <div className={`${styles.header}`}>
            <span className={``}>{`Market Size (${this.props.selectedCoins.receive})`}</span>
            <span className={``}>{`Price (1/${this.props.selectedCoins.deposit})`}</span>
            <span className={``}>{`Price (${this.props.selectedCoins.deposit})`}</span>
          </div>
            {sellDepth}
            <div className={styles.separator}></div>
            {buyDepth}
        </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDepth);
