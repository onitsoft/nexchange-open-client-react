import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails, fetchPairs, changeOrderMode } from 'Actions';
import Hero from './Hero/Hero';
import About from './About/About';
import Testimonials from './Testimonials/Testimonials';
import RecentOrders from './RecentOrders/RecentOrders';
import SubscriptionForm from './SubscriptionForm/SubscriptionForm';

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoinDetails();
    if (!this.props.selectedCoin.selectedByUser.deposit && !this.props.selectedCoin.selectedByUser.receive) this.props.fetchPairs();
  }
  componentDidUpdate(prevProps, prevState) {
    // Detect coin change by link
    const oldUrlParams = new URLSearchParams(prevProps.location.search);
    const oldPairParam = oldUrlParams.get('pair');
    const newUrlParams = new URLSearchParams(this.props.location.search);
    const newPairParam = newUrlParams.get('pair');
    if (newPairParam && newPairParam !== oldPairParam) {
      this.props.fetchCoinDetails();
      this.props.fetchPairs();
    }
  }

  render() {
    return (
      <div>
        <Hero {...this.props} />
        <RecentOrders />
        <Testimonials />
        <About />
        <SubscriptionForm />
      </div>
    );
  }
}

const mapStateToProps = ({ orderMode, coinsInfo, selectedCoin }) => ({ orderMode, coinsInfo, selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCoinDetails, fetchPairs, changeOrderMode }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
