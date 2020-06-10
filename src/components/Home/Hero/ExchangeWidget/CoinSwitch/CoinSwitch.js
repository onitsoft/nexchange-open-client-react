import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCoin } from 'Actions/index.js';
import styles from './CoinSwitch.scss';

class CoinSwitch extends Component {
  state = {};

  componentDidMount() {}

  handleClick = () => {
    const deposit = this.props.selectedCoin.receive;
    const receive = this.props.selectedCoin.deposit;

    this.props.selectCoin(
      {
        ...this.props.selectedCoin,
        deposit,
        receive,
        selectedByUser: {
          deposit: true,
          receive: true,
        },
        orderByAddress: false,
      },
      this.props.pairs
    );

    window.gtag('event', 'Switched coins', { event_category: 'Order', event_label: `${deposit} - ${receive}` });
  };

  render() {
    return (
      <div className={`col-xs-12 col-sm-1 ${styles.container}`}>
        <span className={`${styles.icon}`} onClick={this.handleClick}></span>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, pairs }) => ({ selectedCoin, pairs });
const mapDispatchToProps = dispatch => bindActionCreators({ selectCoin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinSwitch);
