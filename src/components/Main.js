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
						        <h3>Simple. <span className="text-green">Secure</span>. Transparent.</h3>
							</div>
						</div>

						<ExchangeWidget />

						<div className="col-xs-12 text-center">
							<div id="coin-prices">
								<div className="coin-price">
									<h5>BTC <i className="coin-icon cc-BTC"></i></h5>
									<h6>$4,676.3000</h6>
								</div>

								<div className="coin-price">
									<h5>ETH <i className="coin-icon cc-ETH"></i></h5>
									<h6>$387.3400</h6>
								</div>

								<div className="coin-price">
									<h5>LTC <i className="coin-icon cc-LTC"></i></h5>
									<h6>$66.8830</h6>
								</div>
							</div>
						</div>
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
