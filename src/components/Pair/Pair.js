import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs, changeOrderMode } from 'Actions';
import Hero from './Hero/Hero';
import Articles from './Articles/Articles';
import PriceChart from './PriceChartNext';
import RecentOrders from './RecentOrders/RecentOrders';

const Pair = (props) => {

  const { fetchCoinDetails, fetchPairs, match } = props
  const { base, quote } = match.params
  const pair = `${base}${quote}`

  useEffect(() => {
    fetchCoinDetails()
    fetchPairs()
  }, [pair])
  
  return (
    <div>
      <Hero {...props} />
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
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs, changeOrderMode }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pair);
