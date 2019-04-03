import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCoin, fetchPrice, errorAlert } from 'Actions/index.js';
import styles from './CoinSwitch.scss';

class CoinSwitch extends Component {
  state = {};

  componentDidMount() {
  }

  switchCoins = () => {
    const deposit = this.props.selectedCoin.receive;
    const receive = this.props.selectedCoin.deposit;

    const pair = `${receive}${deposit}`;
    const data = {
      pair
    };

    this.props.selectCoin({
      ...this.props.selectedCoin,
      deposit,
      receive,
    });

    window.gtag('event', 'Switched coins', {event_category: 'Order', event_label: `${deposit} - ${receive}`});
  };

  handleClick = () => {
    this.switchCoins();
  };

  render() {
    let showSwitchButton = false;
    const nextDeposit = this.props.selectedCoin.receive;
    const nextReceive = this.props.selectedCoin.deposit;

    if(this.props.pairs && this.props.pairs[nextDeposit] && this.props.pairs[nextDeposit][nextReceive]){
      showSwitchButton = true;
    }

    return (
      <div className={`col-xs-12 col-sm-1 ${styles.container}`}>
        { showSwitchButton ? <span className={`clickable ${styles.icon}`} onClick={this.handleClick}></span>
        : null }
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, pairs }) => ({ selectedCoin, pairs });
const mapDispatchToProps = dispatch => bindActionCreators({ selectCoin }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinSwitch);
