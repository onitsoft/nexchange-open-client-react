import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import _ from 'lodash';

import config from '../config';
import { fetchPrice, setWallet, errorAlert } from '../actions/index.js';

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
		setTimeout(() => {
			this.updatePrices();
		}, 100);
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
			console.log(error.response)

			let message = (error.response.data.non_field_errors && error.response.data.non_field_errors.length ? error.response.data.non_field_errors[0] : 'Something went wrong. Please try again later.');

			this.props.errorAlert({
				message: message,
				show: true,
				type: 'PLACE_ORDER'
			});

			this.setState({
				orderPlaced: false,
				loading: false,
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.wallet.show && nextProps.error.type == 'INVALID_AMOUNT' && nextProps.error.show != false)
			this.props.setWallet({address: '', valid: false, show: false});
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
							<button className="btn btn-block proceed" onClick={() => this.props.setWallet({address: '', valid: false, show: true})} disabled={this.props.error.show && this.props.error.type == 'INVALID_AMOUNT' ? 'disabled' : null}>
								Get Started !
							</button>
						) : (
							<button className="btn btn-block proceed" onClick={this.placeOrder} disabled={(this.props.wallet.valid && !this.state.loading) ? null : 'disabled'}>
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
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
