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

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();
    this.props.fetchPairs();
  }

  render() {
    return (
      <div>
        <Hero {...this.props} />
        <RecentOrders />
        <Testimonials />
        <PriceComparison />
        <About />
        <SubscriptionForm />
      </div>
    );
  }
}

const mapStateToProps = ({ coinsInfo, selectedCoin }) => ({ coinsInfo, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
