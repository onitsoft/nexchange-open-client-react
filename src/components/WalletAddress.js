import React, { Component } from 'react';

class WalletAddress extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.nameInput.focus(); 
	}

    validateWalletAddress() {
        let rules = {
            BTC: /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/,
            LTC: /^L[1-9A-Za-z]{25,34}$/,
            ETH: /^0x[0-9a-fA-F]{40}$/,
        };

        return rules[this.props.coin].test(this.state.value);
    }

    onChange(event) {
    	this.setState({value: event.target.value}, () => {
    		let isWalletAddressValid = this.validateWalletAddress();
			this.props.toggleConfirm(isWalletAddressValid);
    	});
    }

	render() {
		return (
			<div className="form-group label-floating has-warning">
				<label htmlFor="withdraw-addr" className="control-label">Your {this.props.coin} Address</label>
				<input type="text" ref={(input) => { this.nameInput = input; }} name="amount" className="form-control addr" id="withdraw-addr" onChange={this.onChange} value={this.state.value} />
			</div>
		);
	}
}

export default WalletAddress;
