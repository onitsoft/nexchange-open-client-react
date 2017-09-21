import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';

import { selectCoin, fetchPrice, setWallet } from '../actions/index.js';


class CoinSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownVisible: false
		}

    	this.selectCoin = this.selectCoin.bind(this);
	}

	selectCoin(coin) {
		this.props.selectCoin(Object.assign({}, this.props.selectedCoin, {[this.props.type]: coin}));

		setTimeout(() => {
			this.props.fetchPrice({pair: `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`, lastEdited: this.props.amounts.lastEdited, amount: this.props.amounts[this.props.amounts.lastEdited]});
		}, 300)

		this.setState({isDropdownVisible: false, selectedCoin: coin});

		ga('send', 'event', 'Order', 'select coin');
	}

	handleClickOutside(event) {
		this.setState({isDropdownVisible: false});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedCoin: this.props.selectedCoin[this.props.type]});
	}

	render() {
		let selectedCoin = this.props.selectedCoin[this.props.type],
			coins = this.props.coinsInfo.map(coin => {
				return (
					<div className="row coin" key={coin.code} onClick={() => this.selectCoin(coin.code)}>
						<div className="col-xs-3">{coin.code}</div>
						<div className="col-xs-3 text-center">
							<i className={`cc-${coin.code} ${coin.code}`}></i>
						</div>
						<div className="col-xs-6 text-capitalize">{coin.name}</div>
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
		setWallet: setWallet,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CoinSelector));
