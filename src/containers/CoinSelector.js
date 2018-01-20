import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import Helpers from '../helpers';

import { selectCoin, fetchPrice, setWallet } from '../actions/index.js';


class CoinSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownVisible: false,
			selectedCoin: null
		}

    this.selectCoin = this.selectCoin.bind(this);
	}

	selectCoin(coin) {
		this.props.selectCoin(Object.assign({}, this.props.selectedCoin, {[this.props.type]: coin, lastSelected: this.props.type}));

		this.setState({isDropdownVisible: false});

		ga('send', 'event', 'Order', 'select coin');
	}

	handleClickOutside(event) {
		this.setState({isDropdownVisible: false});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedCoin[this.props.type] !== nextProps.selectedCoin[this.props.type]) {
			this.props.fetchPrice({pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`, lastEdited: nextProps.amounts.lastEdited, amount: nextProps.amounts[nextProps.amounts.lastEdited]});
		}
	}

	render() {
		let selectedCoin = this.props.selectedCoin[this.props.type],
			type = this.props.type,
			lastSelectedType = this.props.selectedCoin.lastSelected,
			lastSelectedCoin = this.props.selectedCoin[lastSelectedType],
			filteredCoins = this.props.coinsInfo.filter(coin => {
	   		let params = Helpers.urlParams();

				if (this.props.pairs && type !== lastSelectedType && lastSelectedCoin !== coin.code) {
					if (lastSelectedType === 'deposit') {
						return this.props.pairs[lastSelectedCoin][coin.code];
					} else if (lastSelectedType === 'receive') {
						return this.props.pairs[coin.code][lastSelectedCoin];
					}
				}

	      if (params && params.hasOwnProperty('test')) {
					return (type.toUpperCase() === 'DEPOSIT') ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
				}

				return (type.toUpperCase() === 'DEPOSIT') ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;
			}),
			coins = filteredCoins.map(coin => {
				return (
					<div className="row coin" key={coin.code} onClick={() => this.selectCoin(coin.code)}>
						<div className="col-xs-4">{coin.code}</div>
						<div className="col-xs-3 text-center">
							<i className={`cc-${coin.code} ${coin.code}`}></i>
						</div>
						<div className="col-xs-5 text-capitalize">{coin.name}</div>
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
		pairs: state.pairs
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectCoin: selectCoin,
		fetchPrice: fetchPrice,
		setWallet: setWallet,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CoinSelector));
