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
    let items = [];
    if(!_.isEmpty(this.props.depth)){
      items = this.props.depth.map((depthItem) => {
        return <OrderDepthItem key={String(depthItem.market)} item={depthItem} side={this.props.side} />;
      });
    }

    return (
      <I18n ns="translations">
        {t => (
          <div className={`${styles.container}`}>
          <h4 className={`${styles.title}`}>{`ORDER DEPTH - ${this.props.side}`}</h4>
          <div className={`${styles.header}`}>
            <span className={``}>{`Market Size (${this.props.selectedCoins.deposit})`}</span>
            <span className={``}>{`Price (1/${this.props.selectedCoins.receive})`}</span>
          </div>
          <div className={``}>
            {items}
          </div>
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
