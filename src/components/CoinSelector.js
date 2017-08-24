import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCoin, fetchPrice } from '../actions/index.js';

class CoinSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isDropdownVisible: false
		}

    	this.selectCoin = this.selectCoin.bind(this);
	}

	selectCoin(coin) {
		let newSelectedCoinProps = Object.assign({}, this.props.selectedCoin);
		newSelectedCoinProps.present[this.props.type] = coin;
		this.props.selectCoin(newSelectedCoinProps);

		this.props.fetchPrice({pair: `${this.props.selectedCoin.present.receive}${this.props.selectedCoin.present.deposit}`, lastEdited: this.props.amounts.lastEdited, amount: this.props.amounts[this.props.amounts.lastEdited]});

		this.setState({isDropdownVisible: false, selectedCoin: coin});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedCoin: this.props.selectedCoin.present[this.props.type]});
	}

	render() {
		let selectedCoin = this.props.selectedCoin.present[this.props.type],
			coins = this.props.coinsInfo.map(coin => {
				return (
					<div className="row coin" key={coin.ticker} onClick={() => this.selectCoin(coin.ticker)}>
						<div className="col-xs-4">{coin.ticker}</div>
						<div className="col-xs-3 text-center">
							<i className={`cc-${coin.ticker} ${coin.ticker}`}></i>
						</div>
						<div className="col-xs-5">{coin.name}</div>
					</div>
				);
			});

		return (
			<div>
				<div className="selectedCoin" onClick={() => this.setState({isDropdownVisible: !this.state.isDropdownVisible})}>
					<span>{selectedCoin}</span>
					<i className={`coin-icon cc-${selectedCoin}`}></i>
					<i className="fa fa-angle-down"></i>
				</div>

				{this.state.isDropdownVisible ? <div className="coin-currency-dropdown">{coins}</div> : null}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		coinsInfo: state.coinsInfo,
		amounts: state.amounts,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectCoin: selectCoin,
		fetchPrice: fetchPrice,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinSelector);
