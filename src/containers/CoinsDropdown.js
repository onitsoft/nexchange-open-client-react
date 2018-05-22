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

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  searchCoins(filteredCoins) {
    if (!this.state.value) return filteredCoins;

    const fuse = new Fuse(filteredCoins, {
      shouldSort: true,
      threshold: 0.2,
      keys: ['code', 'name'],
    });

    return fuse.search(this.state.value);
  }

  renderSearch() {
    return (
      <div>
        <input type="text" className="coins-search" onChange={this.handleChange} />
      </div>
    );
  }

  renderCoins() {
    const params = urlParams();
    let filteredCoins = this.props.coinsInfo.filter(coin => {
      if (params && params.hasOwnProperty('test')) {
        return this.props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
      }

      return this.props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;
    });
    filteredCoins = _.sortBy(filteredCoins, 'is_crypto');
    filteredCoins = this.searchCoins(filteredCoins);

    return (
      <div className="coins-list">
        {filteredCoins.map(coin => (
          <div className="row coin" key={coin.code} onClick={() => this.props.onClick(coin.code)}>
            <div className="col-xs-4">{coin.code}</div>
            <div className="col-xs-3 text-center">
              <i className={`cc-${coin.code} ${coin.code}`} />
            </div>
            <div className="col-xs-5 text-capitalize">{coin.name}</div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="coin-currency-dropdown">
        {this.renderSearch()}
        {this.renderCoins()}
      </div>
    );
  }
}

export default CoinsDropdown;
