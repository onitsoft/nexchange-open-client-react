import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import config from '../config';

import { errorAlert, updateAmounts, fetchPrice } from '../actions/index.js';


class CoinPrices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rates: {
				btceth: null,
				btcltc: null,
				ltceth: null,
				btcusd: null,
				ethusd: null,
				ltcusd: null,
			},
			change: {
				btceth: '',
				btcltc: '',
				ltceth: '',
				btcusd: '',
				ethusd: '',
				ltcusd: '',
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
		this.fetchPrice('btcltc');
		this.fetchPrice('ltceth');
		this.fetchPrice('btcusd');
		this.fetchPrice('ethusd');
		this.fetchPrice('ltcusd');

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

	        	if (pair.indexOf('usd') != -1)
	        		rate = ((parseFloat(response.data[0].ticker.ask) + parseFloat(response.data[0].ticker.bid)) / 2) * 0.97;

	        	if (rates[pair] != null) {
	        		let change = this.state.change;

	        		if (rate > rates[pair]) change[pair] = 'up';
	        		else if (rate < rates[pair]) change[pair] = 'down';

	        		this.setState({change});

	        		if (pair.toLowerCase() == `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`.toLowerCase())
						this.props.updateAmounts({amount: this.props.amounts[this.props.amounts.lastEdited], lastEdited: this.props.amounts.lastEdited, price: parseFloat(response.data[0].ticker.ask)});

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
						<div className={`coin-price ${this.state.change['btcusd']}`} ref={el => { this.btcusd = el; }}>
							<h5>BTC</h5>
							<h6>${this.state.rates.btcusd ? this.state.rates.btcusd.toFixed(2) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['ethusd']}`} ref={el => { this.ethusd = el; }}>
							<h5>ETH</h5>
							<h6>${this.state.rates.ethusd ? this.state.rates.ethusd.toFixed(2) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['ltcusd']}`} ref={el => { this.ltcusd = el; }}>
							<h5>LTC</h5>
							<h6>${this.state.rates.ltcusd ? this.state.rates.ltcusd.toFixed(2) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['btceth']}`} ref={el => { this.btceth = el; }}>
							<h5>ETH/BTC</h5>
							<h6>{this.state.rates.btceth ? this.state.rates.btceth.toFixed(5) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['btcltc']}`} ref={el => { this.btcltc = el; }}>
							<h5>LTC/BTC</h5>
							<h6>{this.state.rates.btcltc ? this.state.rates.btcltc.toFixed(5) : '...'}</h6>
						</div>

						<div className={`coin-price ${this.state.change['ltceth']}`} ref={el => { this.ltceth = el; }}>
							<h5>ETH/LTC</h5>
							<h6>{this.state.rates.ltceth ? this.state.rates.ltceth.toFixed(5) : '...'}</h6>
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
		updateAmounts: updateAmounts,
		fetchPrice: fetchPrice,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinPrices);
