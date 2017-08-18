import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCoin } from '../actions/index.js';

class CoinSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedCoin: this.props.selectedCoin.present[this.props.type],
			isDropdownVisible: false
		}

    	this.selectCoin = this.selectCoin.bind(this);
	}

	selectCoin(coin) {
		this.props.selectedCoin.present[this.props.type] = coin;

		this.props.selectCoin(this.props.selectedCoin);

		this.setState({
			isDropdownVisible: false,
			selectedCoin: coin
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedCoin: this.props.selectedCoin.present[this.props.type]
		});
	}

	render() {
		let coins = this.props.coinsInfo.map(coin => {
			return (
				<div className="row coin" key={coin.ticker} onClick={() => this.selectCoin(coin.ticker)}>
					<div className="col-xs-4">{coin.ticker}</div>
					<div className="col-xs-3 text-center">
						<i className={`coin-icon ${coin.ticker}`}></i>
					</div>
					<div className="col-xs-5">{coin.name}</div>
				</div>
			);
		});

		return (
			<div>
				<div className="selectedCoin" onClick={() => this.setState({isDropdownVisible: !this.state.isDropdownVisible})}>
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


function mapStateToProps(state) {
	return {
		minDeposit: state.minDeposit,
		selectedCoin: state.selectedCoin,
		coinsInfo: state.coinsInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectCoin: selectCoin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinSelector);
