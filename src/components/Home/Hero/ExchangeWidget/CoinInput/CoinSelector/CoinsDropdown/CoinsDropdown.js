import React, { Component } from 'react';
import _ from 'lodash';
import Fuse from 'fuse.js';
import cx from 'classnames';
import urlParams from 'Utils/urlParams';
import debounce from 'Utils/debounce';
import styles from './CoinsDropdown.css';
import { I18n } from 'react-i18next';

class CoinsDropdown extends Component {
  state = { value: '' };

  componentDidMount = () => {
    this.searchInput.focus();
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
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Coins dropdown search',
      eventAction: this.props.type,
      eventValue: coinSearched,
    });
  }, 300);

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
    let filteredCoins = this.props.coinsInfo.filter(coin => {
      if (params && params.hasOwnProperty('test')) {
        return this.props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
      }

      return this.props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;
    });
    filteredCoins = _.sortBy(filteredCoins, 'is_crypto');
    filteredCoins = this.searchCoins(filteredCoins);

    return filteredCoins;
  };

  renderSearch = () => {
    return (
    <I18n ns="translations">
     {(t) => (
      <form className={styles['coins-search']} onSubmit={this.handleSubmit}>
        <i className="fas fa-search" aria-hidden="true" />
        <input
          type="text"
          placeholder={t('generalterms.search')}
          ref={input => (this.searchInput = input)}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <i className={`material-icons ${this.state.value ? cx(styles.clear, styles.active) : styles.clear}`} onClick={this.clear}>
          clear
        </i>
      </form>
      )}
	 </I18n>
    );
  };

  renderCoins = () => {
    return (
      <div className={styles['coins-list']}>
        {this.getCoins().map(coin => (
          <div className={`row ${styles.coin}`} key={coin.code} onClick={() => this.props.onClick(coin.code)}>
            <div className="col-xs-3 text-center">
              <i className={`cc ${coin.code} ${coin.code}`} />
            </div>
            <div className="col-xs-3">
              <b>{coin.code}</b>
            </div>
            <div className="col-xs-6 text-capitalize">{coin.name}</div>
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

export default CoinsDropdown;
