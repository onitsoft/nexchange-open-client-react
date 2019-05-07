import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import onClickOutside from 'react-onclickoutside';
import { selectCoin, fetchPrice, errorAlert } from 'Actions/index.js';
import CoinsDropdown from './CoinsDropdown/CoinsDropdown';
import styles from './CoinSelector.scss';

class CoinSelector extends Component {
  state = {
    isDropdownVisible: false,
    selectedCoin: null,
    initialPriceFetched: false,
  };

  componentDidMount() {
    this.fetchPriceInitial(this.props);
  }

  selectCoin = coin => {
    const selectedByUser = this.props.selectedCoin.selectedByUser;
    if(!_.isEmpty(selectedByUser) && !_.isEmpty(this.props.type)) {
      selectedByUser[this.props.type] = true;
    }
    this.props.selectCoin({
      ...this.props.selectedCoin,
      [this.props.type]: coin,
      lastSelected: this.props.type,
      selectedByUser,
    }, this.props.pairs);

    this.setState({ isDropdownVisible: false });
    window.gtag('event', 'Select coin', {event_category: 'Order', event_label: `${this.props.type} - ${coin}`});
  };

  calculateDepositAmount = coin => {
    return ['EUR', 'GBP', 'USD', 'JPY'].indexOf(coin.name) > -1 ? 100 : parseFloat(coin.minimal_amount) * 100;
  };

  handleClickOutside = event => {
    this.setState({ isDropdownVisible: false });
  };

  handleClick = code => {
    this.selectCoin(code);
    if(this.props.onSelect) {
      this.props.onSelect();
    }
  };

  fetchPriceInitial = props => {
    const nextReceiveCoin = props.selectedCoin.receive;
    const nextDepositCoin = props.selectedCoin.deposit;
    const type = props.type;

    // This condition means that we have selected default currency pairs
    // and now need to fetch price.
    if (!this.state.initialPriceFetched && nextDepositCoin && nextReceiveCoin && type === 'deposit') {
      this.setState({
        initialPriceFetched: true,
      });

      this.props.fetchPrice({
        pair: `${nextReceiveCoin}${nextDepositCoin}`,
        lastEdited: 'deposit',
      });
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    const lastSelected = nextProps.selectedCoin.lastSelected;
    const lastEditedPrice = nextProps.price.lastEdited;
    const currentDepositCoin = this.props.selectedCoin.deposit;
    const nextReceiveCoin = nextProps.selectedCoin.receive;
    const nextDepositCoin = nextProps.selectedCoin.deposit;
    const type = nextProps.type;

    this.fetchPriceInitial(nextProps);

    // Check if pair is valid. If not, show error.
    if (
      nextDepositCoin &&
      nextReceiveCoin &&
      this.props.pairs &&
      (!this.props.pairs[nextDepositCoin] || !this.props.pairs[nextDepositCoin][nextReceiveCoin])
    ) {
      if (!this.props.pairs[nextDepositCoin]) {
        this.props.errorAlert({
          message: `${this.props.t('error.nousedeposit')}  ${nextDepositCoin} ${this.props.t('error.nousedeposit2')}`,
          show: true,
          type: 'INVALID_PAIR',
        });
      } else if (!this.props.pairs[nextDepositCoin][nextReceiveCoin]) {
        const validPairs = Object.keys(this.props.pairs[nextDepositCoin])
          .map(coin => coin)
          .filter(coin => this.props.pairs[nextDepositCoin][coin] === true)
          .join(', ');

        this.props.errorAlert({
          message: `${this.props.t('error.invalidpair')}
        ${nextReceiveCoin} ${this.props.t('error.with')} ${nextDepositCoin}. ${this.props.t('error.try')} ${validPairs}.`,
          show: true,
          type: 'INVALID_PAIR',
        });
      }
      // This condition means that selected coin has been changed and price
      // needs to be refetched.
    } else if (
      currentDepositCoin !== null &&
      this.props.selectedCoin[type] !== nextProps.selectedCoin[type] &&
      ((type === 'deposit' && lastSelected === 'deposit') || (type === 'receive' && lastSelected === 'receive'))
    ) {
      const data = {
        pair: `${nextReceiveCoin}${nextDepositCoin}`,
        lastEdited: lastEditedPrice,
        coinSelector: true,
      };

      if (lastEditedPrice === 'deposit') {
        data['deposit'] = nextProps.price.deposit;
      } else if (lastEditedPrice === 'receive') {
        data['receive'] = nextProps.price.receive;
      }

      this.props.fetchPrice(data);
    }
  };

  render() {
    const type = this.props.type;
    const selectedCoin = this.props.selectedCoin[type];

    if (!selectedCoin) return null;

    return (
      <div>
        <div
          className={`selectedCoin-${type} ${styles['selected-coin']} 
            ${this.props.orderBook ? styles[`order-book`] : ``}`}
          data-test="selector"
          onClick={() => this.setState({ isDropdownVisible: !this.state.isDropdownVisible })}
        >
          <i className={`${styles['coin-icon']} cc ${selectedCoin}`} />
          <span className={styles.span} data-test="selected">
            {selectedCoin}
          </span>
          <div className={styles.carret} />
        </div>

        {this.state.isDropdownVisible && <CoinsDropdown type={type} onClick={this.handleClick} coinsInfo={this.props.coinsInfo} />}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, coinsInfo, pairs, price }) => ({ selectedCoin, coinsInfo, pairs, price });
const mapDispatchToProps = dispatch => bindActionCreators({ selectCoin, fetchPrice, errorAlert }, dispatch);

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(onClickOutside(CoinSelector))
);

export const CoinSelectorTesting = translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoinSelector)
);
