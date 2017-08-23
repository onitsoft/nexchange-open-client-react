import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert, setWallet } from '../actions/index.js';


class WalletAddress extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

    validateWalletAddress(address) {
        let rules = {
            BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
            LTC: /^L[1-9A-Za-z]{25,34}$/,
            ETH: /^0x[0-9a-fA-F]{40}$/,
        };

        let coin = this.props.selectedCoin.present.receive,
        	isValid = rules[coin].test(address);

        if (!isValid) 
        	this.props.errorAlert({show: true, message: `Invalid wallet address. Please put valid ${this.props.selectedCoin.present.receive} wallet address.`});
        else
        	this.props.errorAlert({show: false});

        return isValid;
    }

    onChange(event) {
		let address = event.target.value,
			valid = this.validateWalletAddress(address);

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
    	if (nextProps.wallet.show && (this.props.wallet.show != nextProps.wallet.show)) {
    		setTimeout(() => this.nameInput.focus(), 300);
    	}
    }

	render() {
		return (
			<div id="wallet-address" className={this.props.wallet.show ? 'col-xs-12 active' : 'col-xs-12'}>
				<div className="form-group label-floating has-warning">
					<label htmlFor="withdraw-addr" className="control-label">Your {this.props.selectedCoin.present.receive} Address</label>
					<input type="text" ref={input => { this.nameInput = input; }} className="form-control addr" id="withdraw-addr" onChange={this.onChange} />
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