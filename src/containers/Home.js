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


class Home extends Component {
	constructor(props) {
		super(props);

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


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails,
		fetchPairs: fetchPairs,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Home);
