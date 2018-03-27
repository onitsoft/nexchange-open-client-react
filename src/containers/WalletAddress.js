import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert, setWallet } from '../actions/index.js';


class WalletAddress extends Component {
	constructor(props) {
		super(props);

		this.state = { address: '' }
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateWalletAddress(address) {
		const rules = {
			BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
			LTC: /^L[1-9A-Za-z]{25,34}$/,
			ETH: /^0x[0-9a-fA-F]{40}$/,
			EOS: /^0x[0-9a-fA-F]{40}$/,
			BDG: /^0x[0-9a-fA-F]{40}$/,
			GNT: /^0x[0-9a-fA-F]{40}$/,
			OMG: /^0x[0-9a-fA-F]{40}$/,
			QTM: /^0x[0-9a-fA-F]{40}$/,
			BAT: /^0x[0-9a-fA-F]{40}$/,
			REP: /^0x[0-9a-fA-F]{40}$/,
			DOGE: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
			XVG: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
			BCH: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
			NANO: /^xrb_[13][0-9a-fA-F]{59}$/
		};

		const coin = this.props.selectedCoin.receive;
		const isValid = rules[coin].test(address);

		if (address.length && !isValid) {
			this.props.errorAlert({show: true, message: `${address} is not a valid ${this.props.selectedCoin.receive} address.`});
		} else {
			this.props.errorAlert({show: false});
		}

		return isValid;
	}

	handleChange(event) {
		let address = event.target.value.replace(new RegExp(/ /g, 'g'), ''),
			valid = this.validateWalletAddress(address);

		this.setState({ address });

		this.props.setWallet({
			address: address,
			valid: valid,
			show: true
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit();
	}

	componentWillMount() {
		this.props.setWallet({address: '', valid: false, show: false});
	}

  	componentWillReceiveProps(nextProps) {
		if (nextProps.wallet.address != null && (nextProps.wallet.address != this.state.address)) {
			this.setState({address: nextProps.wallet.address});
		}
  	}

	render() {
		return (
			<div id="wallet-address" className={this.props.wallet.show ? 'col-xs-12 active' : 'col-xs-12'}>
				<form
					className="form-group label-floating has-warning"
					onSubmit={this.handleSubmit}
				>
					<label
						htmlFor="withdraw-addr"
						className="control-label text-green">
						Your {this.props.selectedCoin.receive} Address
					</label>
					
					<input
						type="text" 
						ref={this.props.inputRef}
						className="form-control addr" id="withdraw-addr"
						onChange={this.handleChange}
						value={this.state.address} 
					/>
				</form>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		wallet: state.wallet,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
		setWallet: setWallet,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletAddress);