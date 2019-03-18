import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
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

    if (window.ga) window.ga('send', 'event', 'Order', 'switched coins');
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
        { showSwitchButton ? <i className={`fas fa-exchange-alt fa-2x clickable ${styles.icon}`} onClick={this.handleClick}></i> : null }
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

// export const CoinSelectorTesting = translate()(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(CoinSelector)
// );
