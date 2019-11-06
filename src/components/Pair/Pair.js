import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs, changeOrderMode, selectCoin } from 'Actions';
import Hero from './Hero/Hero';
import Articles from './Articles/Articles';
import PriceChart from './PriceChartNext';
import RecentOrders from './RecentOrders/RecentOrders';

const Pair = (props) => {

  const { fetchCoinDetails, fetchPairs, match } = props
  const { base, quote } = match.params
  const pair = useMemo(() => `${base}${quote}`, [base, quote])
  const selectedCoin = useMemo(() => ({
    receive: base,
    deposit: quote
  }), [pair])

  useEffect(() => {
    fetchCoinDetails()
    fetchPairs({base, quote})
  }, [pair])

  
  return (
    <div>
      <Hero {...props} selectedCoin={selectedCoin} />
      <div className='container'>
        <h1>Price Chart for {pair}</h1>
        <PriceChart pair={pair}/>
      </div>
      <RecentOrders {...props} />
      <Articles {...props} />
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
