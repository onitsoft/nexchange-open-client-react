import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import _ from 'lodash';

import config from '../config';
import { fetchPrice, setWallet } from '../actions/index.js';

import CoinInput from './CoinInput';
import WalletAddress from './WalletAddress';


class ExchangeWidget extends Component {
	
	constructor(props) {
		super();
		
		this.state = {
			orderPlaced: false,
			loading: false,
	  	};
	  	  	 	
	  	this.placeOrder = this.placeOrder.bind(this);
	  	this.updatePrices = this.updatePrices.bind(this);
	}

	componentDidMount() {
		this.updatePrices();
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	updatePrices() {
		this.props.fetchPrice({pair: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`, lastEdited: 'deposit', amount: this.props.amounts.deposit});

		this.timeout = setTimeout(() => {
			this.updatePrices();
		}, config.PRICE_FETCH_INTERVAL);
	}

	placeOrder() {
		this.setState({loading: true});

		axios({
			method: 'post',
			contentType : 'application/json',
			url: `${config.API_BASE_URL}/orders/`,
			data: {
				"amount_base": this.props.amounts.receive,
				"is_default_rule": true,
				"pair": {
					"name": `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`
				},
				"withdraw_address": {
					"address": this.props.wallet.address,
					"name": ""
				}
			}
		})
		.then(response => {
			this.setState({
				orderRef: response.data.unique_reference,
				orderPlaced: true,
				loading: false
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.wallet.show && nextProps.error.type == 'INVALID_AMOUNT') {
			this.props.setWallet({address: '', valid: false, show: false})
		}
	}

	render() {
		if (this.state.orderPlaced)
			return <Redirect to={`/order/${this.state.orderRef}`} />

		return (
			<div className="col-xs-12">
				<div id="exchange-widget">
					<div className="col-xs-12 col-sm-6">
						<CoinInput type="deposit" />
					</div>

					<div className="col-xs-12 col-sm-6">
						<CoinInput type="receive" />
					</div>

					<WalletAddress />

					<div className="col-xs-12 text-center">
						{!this.props.wallet.show ? (
							<button className="btn btn-block btn-success proceed" onClick={() => this.props.setWallet({show: true})} disabled={this.props.error.show ? 'disabled' : null}>
								Get Started !
							</button>
						) : (
							<button className="btn btn-block btn-warning proceed" onClick={this.placeOrder} disabled={(this.props.wallet.valid && !this.state.loading) ? null : 'disabled'}>
								Confirm & Place Order
								{this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
							</button>
						)}
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
		error: state.error,
		wallet: state.wallet,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPrice: fetchPrice,
		setWallet: setWallet,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
