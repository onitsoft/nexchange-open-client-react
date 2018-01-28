import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchCoinDetails, fetchPairs, fetchPrice } from '../actions';

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
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.coinsInfo.length !== nextProps.coinsInfo.length) {
			this.props.fetchPairs(nextProps.coinsInfo);
		}

		if (this.props.coinsInfo.length && nextProps.selectedCoin.deposit) {
			let depositCoin = _.filter(this.props.coinsInfo, {code: nextProps.selectedCoin.deposit})[0];

			this.props.fetchPrice({
				pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`,
				lastEdited: 'deposit',
				amount: parseFloat(depositCoin.minimal_amount)*10
			});
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
		fetchPrice: fetchPrice,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
