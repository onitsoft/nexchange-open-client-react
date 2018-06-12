import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs } from '../actions';

import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import RecentOrders from '../containers/RecentOrders';
import SubscriptionForm from '../components/SubscriptionForm';
import PriceComparison from '../containers/PriceComparison';
import Trustpilot from '../components/Trustpilot';

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();
    this.props.fetchPairs();
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

const mapStateToProps = ({ coinsInfo, selectedCoin }) => ({ coinsInfo, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
