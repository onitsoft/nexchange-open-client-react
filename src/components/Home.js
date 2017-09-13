import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails } from '../actions';

import Hero from '../components/Hero';
import About from '../components/About';
import RecentOrders from '../components/RecentOrders';
import SubscriptionForm from '../components/SubscriptionForm';


class Home extends Component {
	constructor(props) {
		super(props);

		this.props.fetchCoinDetails();
	}

	render() {
		return (
		  <div>
		    <Hero />
		    <RecentOrders />
		    <About />
		    <SubscriptionForm />
		  </div>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Home);
