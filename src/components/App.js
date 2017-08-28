import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCoinDetails } from '../actions';

import Main from '../components/Main';
import Team from '../components/Team';
import RecentOrders from '../components/RecentOrders';


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
		  </div>
		);
	}
}

// function mapStateToProps(state) {
// 	return {
// 		selectedCoin: state.selectedCoin,
// 		amounts: state.amounts,
// 		error: state.error,
// 		wallet: state.wallet,
// 	}
// }

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCoinDetails: fetchCoinDetails,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(App);
