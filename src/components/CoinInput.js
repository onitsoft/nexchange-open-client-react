import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import axios from 'axios';

import config from '../config';
import { errorAlert, updateAmounts, fetchPrice } from '../actions/index.js';
import CoinSelector from './CoinSelector';


class CoinInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: this.props.amounts[this.props.type]
		}

		this.onChange = this.onChange.bind(this);
	}
	
	onChange(event) {
		let value = event.target.value,
			selectedCoin = this.props.selectedCoin.present[this.props.type],
			minAmount = _.find(this.props.coinsInfo, {ticker: selectedCoin}).min_amount;

		if (value < minAmount) {
			this.props.errorAlert({
				message: `Deposit amount cannot be less than ${minAmount}`,
				show: true
			});
		} else {
			this.props.errorAlert({show: false});
		}

		let nextProps = Object.assign({}, this.props.amounts);
		nextProps.lastEdited = this.props.type;
		nextProps[this.props.type] = value;
		nextProps.update = true;
		this.props.updateAmounts(nextProps)

		if (this.props.type == 'receive')
			this.props.fetchPrice(`${this.props.selectedCoin.present.receive}${this.props.selectedCoin.present.deposit}`);
		else
			this.props.fetchPrice(`${this.props.selectedCoin.present.deposit}${this.props.selectedCoin.present.receive}`);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.type == this.props.amounts.lastEdited && this.props.amounts.update != false) {
			let nextProps = Object.assign({}, this.props.amounts),
				opposite = (this.props.amounts.lastEdited == 'receive' ? 'deposit' : 'receive'),
				sum = parseFloat(nextProps.deposit) * this.props.price;

			if (this.props.type == 'receive')
				sum = parseFloat(nextProps.receive) * this.props.price;

			nextProps.lastEdited = this.props.type;
			nextProps[opposite] = (isNaN(sum) ? '...' : sum);
			nextProps['update'] = false;
			this.props.updateAmounts(nextProps)
		}
	}

	render() {
		return (
		  <div className="form-group label-floating has-success">
		    <label htmlFor={this.props.type} className="control-label">{this.props.type}</label>
		    <input type="text" className="form-control coin" id={`coin-input-${this.props.type}`} name={this.props.type} value={this.props.amounts[this.props.type]} onChange={this.onChange} />

		    <CoinSelector type={this.props.type} />
		  </div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		coinsInfo: state.coinsInfo,
		amounts: state.amounts,
		price: state.price
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
		updateAmounts: updateAmounts,
		fetchPrice: fetchPrice
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinInput);
