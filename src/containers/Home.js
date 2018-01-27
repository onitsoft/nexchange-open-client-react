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

				<div style={{background: '#fff'}}>
					<div className="container">
					<div className="row">
					<div className="col-xs-12" style={{marginTop: 60, 	marginBottom: 60}}>
						<div className="trustpilot-widget" data-locale="en-GB" data-template-id="53aa8912dec7e10d38f59f36" data-businessunit-id="59ccf3880000ff0005ac459a" data-style-height="130px" data-style-width="100%" data-theme="light" data-stars="4,5" data-schema-type="Organization">
						<a href="https://uk.trustpilot.com/review/nexchange.io" target="_blank">Trustpilot</a>
						</div>
					</div>
					</div>
					</div>
					</div>

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
