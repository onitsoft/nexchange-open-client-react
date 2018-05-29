import React, { Component } from 'react';
import _ from 'lodash';
import urlParams from '../helpers/urlParams';
import Fuse from 'fuse.js';
import '../css/_coins-dropdown.scss';

class CoinsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

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
    if (coins.length === 1) {
      this.props.onClick(coins[0].code);
    }
  };

  clear = () => {
    this.setState({ value: '' });
  };

  searchCoins = coins => {
    if (!this.state.value) return coins;

    const fuse = new Fuse(coins, {
      shouldSort: true,
      threshold: 0.2,
      keys: ['code', 'name'],
    });

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
      <form className="coins-search" onSubmit={this.handleSubmit}>
        <i class="fa fa-search" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search"
          ref={input => (this.searchInput = input)}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <i className={`material-icons clear ${this.state.value ? 'active' : null}`} onClick={this.clear}>
          clear
        </i>
      </form>
    );
  };

  renderCoins = () => {
    return (
      <div className="coins-list">
        {this.getCoins().map(coin => (
          <div className="row coin" key={coin.code} onClick={() => this.props.onClick(coin.code)}>
            <div className="col-xs-3">
              <b>{coin.code}</b>
            </div>
            <div className="col-xs-3 text-center">
              <i className={`cc ${coin.code} ${coin.code}`} />
            </div>
            <div className="col-xs-6 text-capitalize">{coin.name}</div>
          </div>
        ))}
      </div>
    );
  };

  render = () => {
    return (
      <div className="coin-currency-dropdown">
        {this.renderSearch()}
        {this.renderCoins()}
      </div>
    );
  };
}

export default CoinsDropdown;
