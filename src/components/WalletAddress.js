import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert } from '../actions/index.js';


class WalletAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: ''
		}

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.nameInput.focus(); 
	}

    validateWalletAddress(coin = this.props.selectedCoin.present.receive) {
        let rules = {
            BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
            LTC: /^L[1-9A-Za-z]{25,34}$/,
            ETH: /^0x[0-9a-fA-F]{40}$/,
        };

        let isValid = rules[coin].test(this.state.address);

        console.log("IS VALID", isValid);

        if (!isValid) 
        	this.props.errorAlert({show: true, message: `Invalid wallet address. Please put valid ${this.props.selectedCoin.present.receive} wallet address.`});
        else
        	this.props.errorAlert({Show: false});

        return isValid;
    }

    onChange(event) {
    	this.setState({address: event.target.value}, () => {
    		let isWalletAddressValid = this.validateWalletAddress();
			this.props.toggleConfirm(this.state.address, isWalletAddressValid);
    	});
    }

    componentWillReceiveProps(nextProps) {
    	let isWalletAddressValid = this.validateWalletAddress(nextProps.selectedCoin.present.receive);
    	this.props.toggleConfirm(this.state.address, isWalletAddressValid);
    }

	render() {
		return (
			<div className="form-group label-floating has-warning">
				<label htmlFor="withdraw-addr" className="control-label">Your {this.props.selectedCoin.present.receive} Address</label>
				<input type="text" ref={(input) => { this.nameInput = input; }} name="amount" className="form-control addr" id="withdraw-addr" onChange={this.onChange} value={this.state.address} />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletAddress);