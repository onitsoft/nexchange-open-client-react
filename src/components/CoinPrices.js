import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';


class CoinPrices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rates: {
				btceth: null,
				btcltc: null,
				ltceth: null
			},
			change: {
				btceth: '',
				btcltc: '',
				ltceth: ''
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
	        		rate = 1 / parseFloat(response.data[0].ticker.ask),
	        		key = pair.toLowerCase();

	        	if (rates[key] != null) {
	        		let change = this.state.change;

	        		if (rate > rates[key]) change[key] = 'up';
	        		else if (rate < rates[key]) change[key] = 'down';

	        		this.setState({change});

	        		setTimeout(() => {
	        			let change = this.state.change;

	        			change[key] = '';
	        			this.setState({change});
	        		}, 3000);
	        	}

	        	rates[key] = rate;
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

export default CoinPrices;
