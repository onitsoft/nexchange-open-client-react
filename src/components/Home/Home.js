import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs } from 'Actions';

import Hero from './Hero/Hero';
import About from './About/About';
import Team from './Team/Team';
import ICO from './ICO/ICO';
import Testimonials from './Testimonials/Testimonials';
import RecentOrders from './RecentOrders/RecentOrders';
import SubscriptionForm from './SubscriptionForm/SubscriptionForm';
import PriceComparison from './PriceComparison/PriceComparison';

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();
    this.props.fetchPairs();
  }
  componentDidUpdate(prevProps, prevState) {
    // Detect coin change by link
    if(this.props.location.search !== prevProps.location.search) {
        this.props.fetchCoinDetails();
        this.props.fetchPairs();
    }
  }

  render() {
    return (
      <div>
        <Hero {...this.props} />
        <RecentOrders />
        <ICO />
        <Testimonials />
        <PriceComparison />
        <About />
        <Team />
        <SubscriptionForm />
      </div>
    );
  }
}

const mapStateToProps = ({ orderBook, coinsInfo, selectedCoin }) => ({ coinsInfo, selectedCoin, orderBook });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
