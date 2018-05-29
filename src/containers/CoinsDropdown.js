import React from 'react';
import _ from 'lodash';
import urlParams from '../helpers/urlParams';
import '../css/_coins-dropdown.scss';

const CoinsDropdown = props => {
  const search = null;

  let filteredCoins = props.coinsInfo.filter(coin => {
    let params = urlParams();

    if (params && params.hasOwnProperty('test')) {
      return props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
    }

    return props.type.toUpperCase() === 'DEPOSIT' ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;
  });

  filteredCoins = _.sortBy(filteredCoins, 'is_crypto');

  const coins = filteredCoins.map(coin => {
    return (
      <div className="row coin" key={coin.code} onClick={() => props.onClick(coin.code)}>
        <div className="col-xs-4">{coin.code}</div>
        <div className="col-xs-3 text-center">
          <i className={`cc ${coin.code}`} />
        </div>
        <div className="col-xs-5 text-capitalize">{coin.name}</div>
      </div>
    );
  });

  return (
    <div className="coin-currency-dropdown">
      {search}
      {coins}
    </div>
  );
};

export default CoinsDropdown;
