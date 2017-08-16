import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import '../css/components/ExchangeWidget.scss';

import CoinInput from './CoinInput.js';
import WalletAddress from './WalletAddress.js';


class ExchangeWidget extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			exchangeProceeded: false,
			isConfirmEnabled: false,
			depositValue: 1,
			receiveValue: '...',
			depositCoin: 'BTC',
			receiveCoin: 'ETH',
			depositCoinPrevious: 'BTC',
			receiveCoinPrevious: 'ETH',
			lastEdited: 'deposit'
	  	};

	  	this.apiBaseUrl = `https://nexchange.co.uk/en/api/v1/price/`;

	  	this.handleChange = this.handleChange.bind(this);
	  	this.setNewCoin = this.setNewCoin.bind(this);	  	
	  	this.updatePrices = this.updatePrices.bind(this);	  	
	  	this.proceedExchange = this.proceedExchange.bind(this);	  	
	  	this.toggleConfirm = this.toggleConfirm.bind(this);	  	
	}

	componentWillMount() {
		let apiUrl = this.apiBaseUrl + `${this.state.depositCoin}${this.state.receiveCoin}/latest/`;
		this.updatePrices(apiUrl);
	}

	componentDidUpdate() {
		if (this.state.depositCoin != this.state.depositCoinPrevious ||
			this.state.receiveCoin != this.state.receiveCoinPrevious) {
			let apiUrl = this.apiBaseUrl + `${this.state.depositCoin}${this.state.receiveCoin}/latest/`;
			this.setState({
				lastEdited: 'deposit',
				receiveCoinPrevious: this.state.receiveCoin,
				depositCoinPrevious: this.state.depositCoin
			}, () => {
				this.updatePrices(apiUrl);
			});
		}
	}

	updatePrices(apiUrl) {
		axios.get(apiUrl)
			.then((response) => {
				let basePrice = response.data[0].ticker.ask;

				if (this.state.lastEdited == 'deposit') {
					let newAmount = parseFloat(this.state.depositValue) * basePrice;
					this.setState({receiveValue: newAmount});
				} else {
					let newAmount = parseFloat(this.state.receiveValue) * basePrice;
					this.setState({depositValue: newAmount});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	
	handleChange(event) {
	    let lastEdited = event.target.name,
	    	apiUrl = this.apiBaseUrl,
	    	newState = {lastEdited: lastEdited};

	    newState[`${lastEdited}Value`] = event.target.value;

	    if (lastEdited == 'receive')
	    	apiUrl += `${this.state.receiveCoin}${this.state.depositCoin}/latest/`;
	    else
	    	apiUrl += `${this.state.depositCoin}${this.state.receiveCoin}/latest/`;

		this.setState(newState, () => {
			this.updatePrices(apiUrl);
		});
	}

	setNewCoin(type, coin) {
		if ((type == 'deposit' && coin == this.state.receiveCoin) ||
			(type == 'receive' && coin == this.state.depositCoin)) {
			this.setState({
				depositCoin: this.state.receiveCoin,
				receiveCoin: this.state.depositCoin
			})
		} else {
			let newState = {};
			newState[`${type}Coin`] = coin;
			this.setState(newState);
		}
	}

	proceedExchange() {
		this.setState({
			exchangeProceeded: true
		})
	}

	toggleConfirm(isConfirmEnabled) {
		this.setState({isConfirmEnabled: isConfirmEnabled});
	}

	render() {
		return (
			<div>
			  <div className="col-xs-12 col-sm-6">
			    <CoinInput type="deposit" onChange={this.handleChange} onCoinSelect={this.setNewCoin} selectedCoin={this.state.depositCoin} value={this.state.depositValue} />
			  </div>

			  <div className="col-xs-12 col-sm-6">
			    <CoinInput type="receive" onChange={this.handleChange} onCoinSelect={this.setNewCoin} selectedCoin={this.state.receiveCoin} value={this.state.receiveValue} />
			  </div>

			  {this.state.exchangeProceeded ?
			  	<div className="col-xs-12">
			  		<WalletAddress coin={this.state.receiveCoin} toggleConfirm={this.toggleConfirm} />
			  	</div> : null
			  }

			  <div className="col-xs-12 text-center">
			    {!this.state.exchangeProceeded ? (
			    	<button className="btn btn-block btn-success" onClick={this.proceedExchange}>Get Started!</button>
			    ) : (
			    	<Link to="/order/123">
				    	<button className="btn btn-block btn-warning" disabled={this.state.isConfirmEnabled ? null : 'disabled'}>
				    		Confirm & Place Order
				    	</button>
			    	</Link>
			    )}
			  </div>
			</div>
		);
	}
}

export default ExchangeWidget;
