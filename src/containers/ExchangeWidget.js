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
		$(function() {
		    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
		});

		this.updatePrices();
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	updatePrices() {
		this.props.fetchPrice({pair: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`, lastEdited: this.props.amounts.lastEdited, amount: this.props.amounts[this.props.amounts.lastEdited]});

		this.timeout = setTimeout(() => {
			this.updatePrices();
		}, config.PRICE_FETCH_INTERVAL);
	}

	placeOrder() {
		let data = {
			'amount_base': 0,
			'amount_quote': 0,
			'is_default_rule': true,
			'pair': {
				'name': `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`
			},
			'withdraw_address': {
				'address': this.props.wallet.address,
				'name': ''
			}
		};

		if (this.props.amounts.lastEdited === 'receive') data['amount_base'] = parseFloat(this.props.amounts.receive);
		else if (this.props.amounts.lastEdited === 'deposit') data['amount_quote'] = parseFloat(this.props.amounts.deposit);

		axios({
			method: 'post',
			contentType : 'application/json',
			url: `${config.API_BASE_URL}/orders/`,
			data: data
		})
		.then(response => {
			this.setState({orderRef: response.data.unique_reference, orderPlaced: true, loading: false});

			ga('send', 'event', 'Order', 'place order', response.data.unique_reference);
			qp('track', 'Generic');
		})
		.catch(error => {
			console.log(error.response)

			let message = (error.response && error.response.data.non_field_errors && error.response.data.non_field_errors.length ? error.response.data.non_field_errors[0] : 'Something went wrong. Please try again later.');
			this.props.errorAlert({message: message, show: true, type: 'PLACE_ORDER'});
			this.setState({orderPlaced: false, loading: false});
		});
	}

	componentWillReceiveProps(nextProps) {
		if ($('#exchange-widget [data-toggle="tooltip"]').attr("aria-describedby")) {
			let tooltipId = $('#exchange-widget [data-toggle="tooltip"]').attr("aria-describedby");

			$(`#${tooltipId} .tooltip-inner`).html(`The fee amounts to ${(nextProps.amounts.deposit * 0.005)} ${nextProps.selectedCoin.deposit}.`);
		}

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
							<button className="btn btn-block btn-themed proceed" onClick={() => this.props.setWallet({address: '', valid: false, show: true})} disabled={this.props.error.show && this.props.error.type == 'INVALID_AMOUNT' ? 'disabled' : null}>
								Get Started !
							</button>
						) : (
							<button className="btn btn-block btn-themed proceed" onClick={this.placeOrder} disabled={(this.props.wallet.valid && !this.state.loading) ? null : 'disabled'}>
								Confirm & Place Order
								{this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
							</button>
						)}

						<p id="fee-info">* Current fee is 0.5%.
							<i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title=""
								data-original-title={`The fee amounts to ${(this.props.amounts.deposit * 0.005)} ${this.props.selectedCoin.deposit}.`}>
							</i>
						</p>
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
		price: state.price,
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
