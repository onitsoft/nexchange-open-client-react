import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import _ from 'lodash';

import { updateAmounts } from '../actions/index.js';

import config from '../config';

import CoinInput from './CoinInput';
import WalletAddress from './WalletAddress';


class ExchangeWidget extends Component {
	
	constructor(props) {
		super();
		
		this.state = {
			exchangeProceeded: false,
			orderPlaced: false,
			isConfirmEnabled: false,
			loading: false,
			receiveAddress: null,
	  	};
	  	  	
	  	this.toggleConfirm = this.toggleConfirm.bind(this);	  	
	  	this.placeOrder = this.placeOrder.bind(this);
	}

	componentDidMount() {
		// let nextProps = Object.assign({}, this.props.amounts);
		// nextProps['update'] = true;
		// nextProps['lastEdited'] = 'deposit';

		// this.props.updateAmounts(nextProps);
		// this.props.fetchPrice(`${this.props.selectedCoin.present.deposit}${this.props.selectedCoin.present.receive}`);
		// this.fetchPrice();
	}

	// fetchPrice() {
 //    	setTimeout(() => {
 //    		this.props.fetchPrice(`${this.props.selectedCoin.present.deposit}${this.props.selectedCoin.present.receive}`);
 //    		this.fetchPrice();
 //    	}, config.PRICE_FETCH_INTERVAL);
	// }

	placeOrder() {
		this.setState({loading: true});

		axios({
			method: 'post',
			url: `${config.API_BASE_URL}/orders/`,
			data: {
				"amount_base": this.props.amounts.receive,
				"is_default_rule": true,
				"pair": {
					"name": `${this.props.selectedCoin.present.receive}${this.props.selectedCoin.present.deposit}`
				},
				"withdraw_address": {
					"address": this.state.receiveAddress,
					"name": ""
				}
			},
	        contentType : "application/json"
		})
		.then((response) => {
			this.setState({
				orderRef: response.data.unique_reference,
				orderPlaced: true,
				loading: false
			})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	toggleConfirm(address, isConfirmEnabled) {
		// TODO: this should be refactored to Redux as now
		// isConfirmEnabled is passed from child
		this.setState({isConfirmEnabled: isConfirmEnabled, receiveAddress: address});
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.exchangeProceeded && nextProps.error.type == 'INVALID_AMOUNT') {
			this.setState({exchangeProceeded: !nextProps.error.show})
		}
	}

	render() {
		if (this.state.orderPlaced)
			return <Redirect to={`/order/${this.state.orderRef}`} />

		return (
			<div>
				<div className="col-xs-12 col-sm-6">
					<CoinInput type="deposit" />
				</div>

				<div className="col-xs-12 col-sm-6">
					<CoinInput type="receive" />
				</div>

				{this.state.exchangeProceeded ?
					<div className="col-xs-12">
						<WalletAddress toggleConfirm={this.toggleConfirm} />
					</div> : null
				}

				<div className="col-xs-12 text-center">
					{!this.state.exchangeProceeded ? (
						<button className="btn btn-block btn-success" onClick={() => this.setState({exchangeProceeded: true})} disabled={this.props.error.show ? 'disabled' : null}>
							Get Started !
						</button>
					) : (
						<button className="btn btn-block btn-warning" onClick={this.placeOrder} disabled={(this.state.isConfirmEnabled && !this.state.loading) ? null : 'disabled'}>
							Confirm & Place Order
							{this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
						</button>
					)}
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
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateAmounts: updateAmounts,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);