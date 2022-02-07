import React, { Component } from 'react';
import _ from 'lodash';
import Fuse from 'fuse.js';
import cx from 'classnames';
import { translate } from 'react-i18next';
import urlParams from 'Utils/urlParams';
import { getMatchingCoins } from 'Utils/walletAddress';
import debounce from 'Utils/debounce';
import styles from './CoinsDropdown.scss';


class CoinsDropdown extends Component {
  state = { value: '' };

  componentDidMount = () => {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const coins = this.getCoins();

    if (coins[0]) {
      this.props.onClick(coins[0].code);
    }
  };

  clear = () => {
    this.setState({ value: '' });
  };

  trackEvent = debounce(coinSearched => {
    window.gtag('event', 'Coins dropdown search', {event_category: 'Order', event_label: `${this.props.type} - ${coinSearched}`});
  }, 100);

  searchCoins = coins => {
    if (!this.state.value) return coins;

    const fuse = new Fuse(coins, {
      shouldSort: true,
      threshold: 0.2,
      keys: ['code', 'name'],
    });

    this.trackEvent(this.state.value);
    
    return fuse.search(this.state.value);
  };

  getCoins = () => {
    const params = urlParams();
    const isQuoteDropdown = this.props.type.toUpperCase() === 'DEPOSIT';
    
    let filteredCoins = this.props.coinsInfo.filter(coin => {
      // if (params && params.hasOwnProperty('test')) {
      //   return isQuoteDropdown ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
      // }
      const isCoinEnabled = isQuoteDropdown ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;

      if (!isCoinEnabled) return false; // Filter out fiat & disabled from receive choice
      if (isQuoteDropdown && coin.is_crypto) return false; // Filter out crypto from deposit choice
      return true;
    });
    
    //Non cryptos first, then alphabetical
    filteredCoins = _.sortBy(filteredCoins, (coin) => coin.is_crypto + coin.code);
    filteredCoins = this.searchCoins(filteredCoins);

    if (this.props.selectedCoin.orderByAddress && this.props.type.toUpperCase() === 'RECEIVE') {
      const matchingCoins  = getMatchingCoins(this.props.wallet.address);
      filteredCoins = _.sortBy(filteredCoins, (coin) => {return matchingCoins.indexOf(coin.code) === -1});
    }

    if(_.isEmpty(filteredCoins)){
      /* eslint max-len: ["error", { "code": 200 }] */
      window.gtag('event', 'Coins dropdown search - Not Found', {event_category: 'Order', event_label: `${this.props.type} - ${this.state.value}`});
    }

    return filteredCoins;
  };

  renderSearch = () => {
    return (
      <form className={styles['coins-search']} onSubmit={this.handleSubmit} data-test="search-form">
        <i className={`${styles.search} fas fa-search`} aria-hidden="true" />
        <input
          type="text"
          placeholder={this.props.t('generalterms.search')}
          ref={input => (this.searchInput = input)}
          onChange={this.handleChange}
          value={this.state.value}
          data-test="search"
        />
        <i
          className={`material-icons ${this.state.value ? cx(styles.clear, styles.active) : styles.clear}`}
          onClick={this.clear}
          data-test="clear"
        >
          clear
        </i>
      </form>
    );
  };

  renderCoins = () => {
    return (
      <div className={styles['coins-list']}>
        {this.getCoins().map(coin => (
          <div data-test={coin.code} className={`row coin ${styles.coin}`} key={coin.code} onClick={() => this.props.onClick(coin.code)}>
            <div className="col-xs-3 text-center">
              <i className={`cc ${coin.code} ${coin.code}`} />
            </div>
            
            <div className="col-xs-3">
              <p>
                <b>{coin.code}</b>
              </p>
            </div>
            
            <div className="col-xs-6 text-capitalize">
              <p>{coin.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render = () => {
    return (
      <div className={`coin-currency-dropdown ${styles['coin-currency-dropdown']}`}>
        {this.renderSearch()}
        {this.renderCoins()}
      </div>
    );
  };
}

export default translate()(CoinsDropdown);
