import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { errorAlert } from '../actions/index.js';

import CoinSelector from './CoinSelector';


class CoinInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: (this.props.type == 'deposit' ? 1 : '...')
		}

		this.onChange = this.onChange.bind(this);
	}
	
	onChange(event) {
		let value = event.target.value,
			selectedCoin = this.props.selectedCoin.present[this.props.type],
			minAmount = _.find(this.props.coinsInfo, {ticker: selectedCoin}).min_amount;

		if (value < minAmount) {
			this.props.errorAlert({
				message: `Deposit amoount cannot be less than ${minAmount}`,
				show: true
			});
		} else {
			this.props.errorAlert({show: false});
		}

		this.setState({value: value})
	}

	render() {
		return (
		  <div className="form-group label-floating has-success">
		    <label htmlFor={this.props.type} className="control-label">{this.props.type}</label>
		    <input type="text" className="form-control coin" id={`coin-input-${this.props.type}`} name={this.props.type} value={this.state.value} onChange={this.onChange} />

		    <CoinSelector type={this.props.type} />
		  </div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		coinsInfo: state.coinsInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ errorAlert: errorAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinInput);
