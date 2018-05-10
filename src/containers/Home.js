import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchCoinDetails, fetchPairs } from '../actions';

import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import RecentOrders from '../containers/RecentOrders';
import SubscriptionForm from '../components/SubscriptionForm';
import PriceComparison from '../containers/PriceComparison';
import Trustpilot from '../components/Trustpilot';


class Home extends Component {
	componentDidMount() {
		this.props.fetchCoinDetails();

		if (this.props.coinsInfo.length) {
			this.props.fetchPairs(this.props.coinsInfo);
		}
	}

	componentWillReceiveProps(nextProps) {
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
		selectedCoin: state.selectedCoin
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails,
		fetchPairs: fetchPairs,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
