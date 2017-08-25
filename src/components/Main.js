import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollToElement from 'scroll-to-element';

import ExchangeWidget from '../components/ExchangeWidget';
import ErrorAlert from '../components/ErrorAlert';


class Main extends Component {

	render() {
	    return (
			<div id="main">
				<ErrorAlert />

				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<div className="brand">
						        <h1>Exchange Cryptocurrencies</h1>
						        <h3>Simple. <span style={{color: "#2cb4a0"}}>Secure</span>. Transparent.</h3>
							</div>
						</div>

						<ExchangeWidget />
					</div>
				</div>

				<div id="mouse-scroll" onClick={() => scrollToElement('#team')}>
					<span className="arrow-1" aria-hidden="true"></span>
					<span className="arrow-2" aria-hidden="true"></span>
					<span className="arrow-3" aria-hidden="true"></span>
				</div>
			</div>
	    );
	}
}

export default Main;
