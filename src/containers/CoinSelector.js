import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import Helpers from '../helpers';
import _ from 'lodash';

import { selectCoin, fetchPrice, setWallet, errorAlert } from '../actions/index.js';


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

	calculateDepositAmount(coin) {
		return (['EUR', 'GBP', 'USD'].indexOf(coin.name) > -1) ? 100 : parseFloat(coin.minimal_amount)*100;
	}

	componentWillReceiveProps(nextProps) {
		// This condition means that we have selected default currency pairs
		// and now need to fetch price.
		if (this.props.selectedCoin.deposit === null && nextProps.selectedCoin.deposit && nextProps.type === 'deposit') {
			let depositCoin = _.filter(nextProps.coinsInfo, {code: nextProps.selectedCoin.deposit})[0];

			this.props.fetchPrice({
				pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`,
				lastEdited: 'deposit',
				deposit: this.calculateDepositAmount(depositCoin)
			});
		}

		// This condition means that selected coin has been changed and price
		// needs to be refetched.
		if (this.props.selectedCoin[this.props.type] !== nextProps.selectedCoin[this.props.type] &&
			((this.props.type === 'deposit' && nextProps.selectedCoin.lastSelected === 'deposit') ||
			(this.props.type === 'receive' && nextProps.selectedCoin.lastSelected === 'receive'))
		) {
			let lastEdited = nextProps.selectedCoin.lastSelected;
			let amount = nextProps.price[lastEdited];
			let data = {
				pair: `${nextProps.selectedCoin.receive}${nextProps.selectedCoin.deposit}`,
				lastEdited: lastEdited
			};

			if (nextProps.selectedCoin.lastSelected === 'deposit' ||
				nextProps.price.deposit === '...' ||
				nextProps.price.receive === '...'
			) {
				let depositCoin = _.filter(this.props.coinsInfo, {code: nextProps.selectedCoin.deposit})[0];
				data['deposit'] = this.calculateDepositAmount(depositCoin);
			} else {
				data['receive'] = amount;
			}

			this.props.fetchPrice(data);
		}

		// Check if pair is valid. If not, show error.
		if (nextProps.selectedCoin.deposit &&
			nextProps.selectedCoin.receive &&
			!this.props.pairs[nextProps.selectedCoin.deposit][nextProps.selectedCoin.receive]) {
				let validPairs = Object.keys(this.props.pairs[nextProps.selectedCoin.deposit])
					.map(coin => coin)
					.filter(coin => this.props.pairs[nextProps.selectedCoin.deposit][coin] === true)
					.join(', ');

				this.props.errorAlert({
					message: `You cannot buy ${nextProps.selectedCoin.receive} with ${nextProps.selectedCoin.deposit}. Try ${validPairs}.`,
					show: true,
					type: 'INVALID_PAIR'
				});
		}
	}

	renderCoinsDropdown(type) {
		let filteredCoins = this.props.coinsInfo.filter(coin => {
	   		let params = Helpers.urlParams();

	      	if (params && params.hasOwnProperty('test')) {
				return (type.toUpperCase() === 'DEPOSIT') ? coin.is_quote_of_enabled_pair_for_test : coin.is_base_of_enabled_pair_for_test;
			}

			return (type.toUpperCase() === 'DEPOSIT') ? coin.is_quote_of_enabled_pair : coin.is_base_of_enabled_pair;
		});

		filteredCoins = _.sortBy(filteredCoins, 'is_crypto');

		const coins = filteredCoins.map(coin => {
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

		return coins;
	}

	render() {
		let type = this.props.type,
			selectedCoin = this.props.selectedCoin[type];

		if (!selectedCoin) return null;

		return (
			<div>
				<div className="selectedCoin" onClick={() => this.setState({isDropdownVisible: !this.state.isDropdownVisible})}>
					<span>{selectedCoin}</span>
					<i className={`coin-icon cc-${selectedCoin}`}></i>
					<i className="fa fa-angle-down"></i>
				</div>

				{this.state.isDropdownVisible && <div className="coin-currency-dropdown">{this.renderCoinsDropdown(type)}</div>}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		coinsInfo: state.coinsInfo,
		pairs: state.pairs,
		price: state.price
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectCoin: selectCoin,
		fetchPrice: fetchPrice,
		setWallet: setWallet,
		errorAlert: errorAlert,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CoinSelector));
