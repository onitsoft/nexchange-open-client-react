import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert, setWallet } from '../actions/index.js';

import Helpers from '../helpers';


class WalletAddress extends Component {
	constructor(props) {
		super(props);

		this.state = { address: '' }
		this.onChange = this.onChange.bind(this);
	}

  onChange(event) {
		let address = event.target.value.replace(new RegExp(/ /g, 'g'), ''),
			valid = Helpers.validateWalletAddress(address, this.props.selectedCoin.receive,
				() => {
					this.props.errorAlert({show: true, message: `${address} is not a valid ${this.props.selectedCoin.receive} address.`});
				},
				() => {
					this.props.errorAlert({show: false});
				});

		this.setState({address: address});

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
