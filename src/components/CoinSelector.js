import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCoin } from '../actions/index.js';

class CoinSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedCoin: this.props.selectedCoin,
			isDropdownVisible: false
		}

	  	this.coins = [
			{name: 'BTC', fullName: 'Bitcoin'},
			{name: 'LTC', fullName: 'Litecoin'},
			{name: 'ETH', fullName: 'Ethereum'}
    	];

    	this.toggleCoinDropdown = this.toggleCoinDropdown.bind(this);
    	this.selectCoin = this.selectCoin.bind(this);
	}

	toggleCoinDropdown() {
		this.setState({
			isDropdownVisible: !this.state.isDropdownVisible
		});
	}

	selectCoin(coin) {
		console.log("COIN SELECT COIN", coin)

		this.props.selectCoin({
			coin: coin,
			type: this.props.type
		});



		this.setState({
			isDropdownVisible: false,
			selectedCoin: coin
		}, () => {
			this.props.onCoinSelect(this.props.type, this.state.selectedCoin);
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedCoin: nextProps.selectedCoin
		})
	}

	render() {
		let coins = this.coins.map(coin => {
			return (
				<div className="row coin" key={coin.name} onClick={() => this.selectCoin(coin.name)}>
					<div className="col-xs-4">{coin.name}</div>
					<div className="col-xs-3 text-center">
						<i className={`coin-icon ${coin.name}`}></i>
					</div>
					<div className="col-xs-5">{coin.fullName}</div>
				</div>
			);
		});

		return (
			<div>
				<div className="selectedCoin" onClick={this.toggleCoinDropdown}>
					{this.state.selectedCoin} <i className={`coin-icon ${this.state.selectedCoin}`}></i>
				</div>

				{this.state.isDropdownVisible ? 
					<div className="coin-currency-dropdown">
						{coins}
					</div> :
					null
				}
			</div>
		);
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectCoin: selectCoin }, dispatch)
}

export default connect(null, mapDispatchToProps)(CoinSelector);
