import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setWallet, selectCoin, fetchPrice } from 'Actions/index.js';
import { validateWalletAddress, getMatchingCoins } from 'Utils/walletAddress';
import styles from './WalletAddress.scss';
import AddressHistory from './AddressHistory/AddressHistory';
import { I18n } from 'react-i18next';
import i18n from '../../../../../i18n';

import urlParams from 'Utils/urlParams';


class WalletAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { address: props.wallet.address, firstLoad: true, showHistory: false };
    this.fireOnBlur = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setCoin = this.setCoin.bind(this);
    this.dontFireOnBlur = this.dontFireOnBlur.bind(this);
  }

  validate = (address, receiveCoin) => {
    if (address === '' || !receiveCoin) {
      this.props.setWallet({
        address,
        valid: false,
      });

      return this.props.errorAlert({ show: false });
    }

    const valid = validateWalletAddress(
      address,
      receiveCoin,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${address} ${i18n.t('error.novalid')} ${receiveCoin} ${i18n.t('generalterms.address')}.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.props.setWallet({
      address,
      valid,
    });
  };

  handleChange(event) {
    const address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ address });
    this.validate(address, this.props.selectedCoin[this.props.withdraw_coin]);
  }

  setFocus(event) {
    event.preventDefault();
    this.fireOnBlur = false;
    this.props.focusWalletAddress();
    this.fireOnBlur = true;
  }

  handleFocus(event) {
    this.setState({
      showHistory: true
    });
  }

  dontFireOnBlur() {
    this.fireOnBlur = false;
  }

  handleBlur(event) {
    if (this.fireOnBlur) {
      this.setState({
        showHistory: false
      });
    }
    this.fireOnBlur = true;
  }

  handlePaste(event) {
    //If user had no interaction with coin selector
    if (!this.props.selectedCoin.selectedByUser['receive'] && this.props.orderMode !== 'ORDER_BOOK') {
      event.preventDefault();
      const address = event.clipboardData.getData('Text').trim();
      const simulatedEvent = { target: { value: address } };
      this.handleChange(simulatedEvent);
      //Get coins that match the pasted address
      const matchingCoins = getMatchingCoins(address);
      if (!_.isEmpty(matchingCoins)) {
        //Check if matching coins are in the order history
        let orderHistory = localStorage['orderHistory'];
        orderHistory = orderHistory ? _.uniqBy(JSON.parse(orderHistory).reverse(), 'withdraw_address') : [];
        const mostRecentMatchingOrder = _.find(orderHistory, function (order) { return matchingCoins.indexOf(order.quote) !== -1; });
        if (mostRecentMatchingOrder) {
          //Set most recent matching coin
          this.setCoin('EUR', mostRecentMatchingOrder.quote);
        } else {
          //Set first matching coin
          this.setCoin('EUR', matchingCoins[0]);
        }
      }


    }
  }


  onKeyDown(event) {
    if (event.keyCode === 9) {
      event.preventDefault();;
      this.fireOnBlur = false;
      this.addressSearchInput.focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoin[this.props.withdraw_coin] !== this.props.selectedCoin[this.props.withdraw_coin]) {
      this.validate(nextProps.wallet.address, nextProps.selectedCoin[this.props.withdraw_coin]);
    }

    if (!this.props.wallet.valid && nextProps.wallet.valid) {
      this.setState({
        showHistory: false
      });
    }

    if(nextProps.wallet.address !== this.props.wallet.address) {
      const simulatedEvent = { target: { value: nextProps.wallet.address } };
      this.handleChange(simulatedEvent);
    }

    try {
      let orderHistory = localStorage['orderHistory'];
      //Most recent order for each address
      this.orderHistory = orderHistory ? _.uniqBy(JSON.parse(orderHistory).reverse(), 'withdraw_address') : [];
      if(nextProps.selectedCoin.selectedByUser.receive) {
        this.orderHistory = _.filter(this.orderHistory, function (order) {
          return order.quote === nextProps.selectedCoin.receive;
        });
      }
    } catch (e) {
      this.orderHistory = [];
    }
  }

  componentDidUpdate() {
    //Check if withdraw_address url param exists. If exists, prefill address field with that value
    const params = urlParams();
    if (params && params.hasOwnProperty('withdraw_address') && !this.props.wallet.address
      && this.props.selectedCoin[this.props.withdraw_coin] && this.state.firstLoad) {
      const simulatedEvent = { target: { value: params['withdraw_address'].toString() } };
      this.handleChange(simulatedEvent);
      this.setState({ firstLoad: false });
      this.props.button.focus();
    }
  }

  setAddress(address) {
    const simulatedEvent = { target: { value: address } };
    this.handleChange(simulatedEvent);
    this.props.button.focus();
  }

  setCoin(depositCoin, receiveCoin) {
    const selectedByUser = this.props.selectedCoin.selectedByUser;
    if (!this.props.selectedCoin.selectedByUser.receive &&
      depositCoin !== this.props.selectedCoin.deposit &&
      receiveCoin !== this.props.selectedCoin.receive) {
      //Select coin
      this.props.selectCoin({
        ...this.props.selectedCoin,
        deposit: depositCoin,
        receive: receiveCoin,
        selectedByUser
      }, this.props.pairs);

      //Update quote value
      const pair = `${receiveCoin}${depositCoin}`;
      const data = {
        pair,
        lastEdited: 'receive',
      };

      data['deposit'] = receiveCoin;
      data['receive'] = depositCoin;
      this.props.fetchPrice(data);
    }
  }

  render() {
    let coin = this.props.selectedCoin[this.props.withdraw_coin] ? this.props.selectedCoin[this.props.withdraw_coin] : '...';
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 active">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref={this.props.inputRef}
                className={`form-control ${styles.input}`}
                id="withdraw-addr"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onPaste={this.handlePaste}
                onKeyDown={this.onKeyDown}
                value={this.state.address}
                autoComplete="off"
                placeholder={t('generalterms.youraddress', { selectedCoin: coin })}
              />
              {!_.isEmpty(this.orderHistory) 
               ?  <button onMouseDown={(e) => this.setFocus(e)} className={styles.previousAddress}>
                    <div className="visible-xs visible-sm"><i className="fas fa-history"></i></div>
                    <div className="visible-md visible-lg">
                      <span>
                        {this.props.orderMode !== 'ORDER_BOOK' ? t('generalterms.usepreviousaddress') : <i className="fas fa-history"></i>}
                      </span>
                    </div>
                  </button>
               :  null}
              {this.state.showHistory ?
                <AddressHistory
                  history={this.orderHistory}
                  setAddress={this.setAddress}
                  setCoin={this.setCoin}
                  dontFireOnBlur={this.dontFireOnBlur}
                  fireBlur={this.handleBlur}
                  addressSearchInput={el => (this.addressSearchInput = el)}
                />
                : null}
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ orderMode, selectedCoin, wallet, pairs }) => ({ orderMode, selectedCoin, wallet, pairs });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setWallet, selectCoin, fetchPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddress);
