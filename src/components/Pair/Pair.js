import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs, changeOrderMode, selectCoin } from 'Actions';
import Hero from './Hero/Hero';
import Articles from './Articles/Articles';
import PriceChart from './PriceChart';
import RecentOrders from './RecentOrders/RecentOrders';
import { useCurrencyAPI } from 'Components/api'

const Pair = (props) => {

  const {
    fetchCoinDetails,
    fetchPairs,
    match
  } = props
  const { base, quote } = match.params
  const pair = useMemo(() => `${quote}${base}`, [quote, base])
  const selectedCoin = useMemo(() => ({
    receive: base,
    deposit: quote
  }), [pair])

  const baseCurrency = useCurrencyAPI(base)
  const quoteCurrency = useCurrencyAPI(quote)

  useEffect(() => {
    fetchCoinDetails()
    fetchPairs({base, quote})
  }, [pair])
  
  return (
    <div>
      <Hero {...props} selectedCoin={selectedCoin} {...{baseCurrency, quoteCurrency}} />
      <div className='container'>
        <h1>Price Chart for {pair}</h1>
        <PriceChart pair={pair}/>
      </div>
      <RecentOrders {...props} />
      <Articles pagename={pair} />
      {/* TODO Referral Program Widget */}
      {/* TODO API Access Widget */}
    </div>
  );
}


const mapStateToProps = ({ orderMode, coinsInfo, selectedCoin }) => ({ orderMode, coinsInfo, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs, changeOrderMode, selectCoin }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pair);
