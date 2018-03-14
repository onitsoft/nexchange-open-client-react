import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert, setWallet } from '../actions/index.js';


class WalletAddress extends Component {
	constructor(props) {
		super(props);

		this.state = { address: '' }
		this.onChange = this.onChange.bind(this);
	}

  validateWalletAddress(address) {
    let rules = {
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

    let coin = this.props.selectedCoin.receive,
    	isValid = rules[coin].test(address);

    if (!isValid && address.length)
    	this.props.errorAlert({show: true, message: `${address} is not a valid ${this.props.selectedCoin.receive} address.`});
    else
    	this.props.errorAlert({show: false});

    return isValid;
  }

  onChange(event) {
	let address = event.target.value.replace(new RegExp(/ /g, 'g'), ''),
		valid = this.validateWalletAddress(address);

	this.setState({ address });

	this.props.setWallet({
		address: address,
		valid: valid,
		show: true
	});
  }

  componentWillMount() {
  	this.props.setWallet({address: '', valid: false, show: false});
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.wallet.address != null && (nextProps.wallet.address != this.state.address)) {
  		this.setState({address: nextProps.wallet.address});
  	}

  	if (nextProps.wallet.show && (this.props.wallet.show != nextProps.wallet.show)) {
  		setTimeout(() => this.nameInput.focus(), 300);
  	}
  }

	render() {
		return (
			<div id="wallet-address" className={this.props.wallet.show ? 'col-xs-12 active' : 'col-xs-12'}>
				<div className="form-group label-floating has-warning">
					<label htmlFor="withdraw-addr" className="control-label text-green">Your {this.props.selectedCoin.receive} Address</label>
					<input type="text" ref={input => { this.nameInput = input; }} className="form-control addr" id="withdraw-addr" onChange={this.onChange} value={this.state.address} />
				</div>
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
