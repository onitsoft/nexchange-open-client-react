import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs } from 'Actions';

import Hero from './Hero/Hero';
import About from './About/About';
import Testimonials from './Testimonials/Testimonials';
import RecentOrders from './RecentOrders/RecentOrders';
import SubscriptionForm from './SubscriptionForm/SubscriptionForm';
import PriceComparison from './PriceComparison/PriceComparison';
import Trustpilot from './Trustpilot/Trustpilot';

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();

    if (this.props.coinsInfo.length) {
      this.props.fetchPairs(this.props.coinsInfo);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.coinsInfo.length !== nextProps.coinsInfo.length) {
      this.props.fetchPairs(nextProps.coinsInfo);
    }
  }

  render() {
    return (
      <div>
        <Hero />
        <RecentOrders />
        <Trustpilot />
        <Testimonials />
        <PriceComparison />
        <About />
        <SubscriptionForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinsInfo: state.coinsInfo,
    selectedCoin: state.selectedCoin,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCoinDetails: fetchCoinDetails,
      fetchPairs: fetchPairs,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
