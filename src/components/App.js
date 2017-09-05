import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails } from '../actions';

import Main from '../components/Main';
import Team from '../components/Team';
import RecentOrders from '../components/RecentOrders';
import SubscriptionForm from '../components/SubscriptionForm';


class App extends Component {
	constructor(props) {
		super(props);

		this.props.fetchCoinDetails();
	}

	render() {
		return (
		  <div className="App">
		    <Main />
		    <RecentOrders />
		    <Team />
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

export default connect(null, mapDispatchToProps)(App);
