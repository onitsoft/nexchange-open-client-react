import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs, changeOrderMode } from 'Actions';
import Hero from './Hero/Hero';
import Articles from './Articles/Articles';
import RecentOrders from './RecentOrders/RecentOrders';

export class Pair extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();
    this.props.fetchPairs();
  }
  componentDidUpdate(prevProps, prevState) {
    // Detect coin change by link
    const oldUrlParams = new URLSearchParams(prevProps.location.search);
    const oldPairParam = oldUrlParams.get('pair');
    const newUrlParams = new URLSearchParams(this.props.location.search);
    const newPairParam = newUrlParams.get('pair');
    if(newPairParam && newPairParam !== oldPairParam) {
        this.props.fetchCoinDetails();
        this.props.fetchPairs();
    }
  }

  render() {
    return (
      <div>
        <Hero {...this.props} />
        <RecentOrders />
        <Articles />
      </div>
    );
  }
}

const mapStateToProps = ({ orderMode, coinsInfo, selectedCoin }) => ({ orderMode, coinsInfo, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs, changeOrderMode }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pair);
