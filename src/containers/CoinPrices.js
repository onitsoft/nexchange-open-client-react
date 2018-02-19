import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from '../config';

import { errorAlert, fetchPrice } from '../actions/index.js';


class CoinPrices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rates: {
				btceth: null,
				btcltc: null,
				btcbdg: null,
				dogebtc: null,
				ethltc: null,
				dogeeth: null,
				dogeltc: null,
			},
			change: {
				btceth: null,
				btcbdg: null,
				btcltc: null,
				dogebtc: null,
				ethltc: null,
				dogeeth: null,
				dogeltc: null,
			}
		}

		this.fetchPrice = this.fetchPrice.bind(this);
		this.fetchPrices = this.fetchPrices.bind(this);
	}

	componentDidMount() {
		this.fetchPrices();
	}

	fetchPrices() {
		this.fetchPrice('btceth');
		this.fetchPrice('btcbdg');
		this.fetchPrice('btcltc');
		this.fetchPrice('dogebtc');
		this.fetchPrice('ethltc');
		this.fetchPrice('dogeltc');

		this.timeout = setTimeout(() => {
			this.fetchPrices();
		}, config.PRICE_FETCH_INTERVAL);
	}

	fetchPrice(pair) {
		const url = `${config.API_BASE_URL}/price/${pair}/latest/`;

		axios.get(url)
	        .then(response => {
	        	if (!response.data.length) return;

	        	let rates = this.state.rates,
	        		rate = 1 / parseFloat(response.data[0].ticker.ask);

	        	if (rates[pair] != null) {
	        		let change = this.state.change;

	        		if (rate > rates[pair]) change[pair] = 'up';
	        		else if (rate < rates[pair]) change[pair] = 'down';

	        		this.setState({change});

	        		setTimeout(() => {
	        			let change = this.state.change;

	        			change[pair] = '';
	        			this.setState({change});
	        		}, 3000);
	        	}

	        	rates[pair] = rate;
	        	this.setState({rates});
	        }).catch(error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
	    return (
			<div className="col-xs-12 text-center">
					<div id="coin-prices">
						<div className={`coin-price ${this.state.change['btceth']}`} ref={el => { this.btceth = el; }}>
							<h5>ETH/BTC</h5>
							<h6>{this.state.rates.btceth ? this.state.rates.btceth.toFixed(5) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['btcbdg']}`} ref={el => { this.btceth = el; }}>
							<h5>BDG/BTC</h5>
							<h6>{this.state.rates.btcbdg ? this.state.rates.btcbdg.toFixed(6) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['btcltc']}`} ref={el => { this.btcltc = el; }}>
							<h5>LTC/BTC</h5>
							<h6>{this.state.rates.btcltc ? this.state.rates.btcltc.toFixed(5) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['dogebtc']}`} ref={el => { this.dogebtc = el; }}>
							<h5>BTC/DOGE</h5>
							<h6>{this.state.rates.dogebtc ? this.state.rates.dogebtc.toFixed(1) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['ethltc']}`} ref={el => { this.ethltc = el; }}>
							<h5>LTC/ETH</h5>
							<h6>{this.state.rates.ethltc ? this.state.rates.ethltc.toFixed(5) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['dogeltc']}`} ref={el => { this.dogeltc = el; }}>
							<h5>LTC/DOGE</h5>
							<h6>{this.state.rates.dogeltc ? this.state.rates.dogeltc.toFixed(1) : '...'}</h6>
						</div>
					</div>
				</div>
	    );
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		amounts: state.amounts,
		price: state.price,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPrice: fetchPrice,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinPrices);
