import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';


class CoinPrices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rates: {
				btceth: '...',
				btcltc: '...',
				ltceth: '...'
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
	        		rate = parseFloat(response.data[0].ticker.ask).toFixed(5),
	        		key = pair.toLowerCase();

	        	if (this.state.rate != '') {
	        		let change = this.state.change;

	        		if (rate > this.state.rate) change[key] = 'up';
	        		else if (rate < this.state.rate) change[key] = 'down';

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
							<h6>{this.state.rates.btceth}</h6>
						</div>

						<div className={`coin-price ${this.state.change['btcltc']}`} ref={el => { this.btcltc = el; }}>
							<h5>LTC/BTC</h5>
							<h6>{this.state.rates.btcltc}</h6>
						</div>

						<div className={`coin-price ${this.state.change['ltceth']}`} ref={el => { this.ltceth = el; }}>
							<h5>ETH/LTC</h5>
							<h6>{this.state.rates.ltceth}</h6>
						</div>
					</div>
				</div>
	    );
	}
}

export default CoinPrices;
