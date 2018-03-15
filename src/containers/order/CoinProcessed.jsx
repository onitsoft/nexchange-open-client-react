import React, { Component } from 'react';


class CoinProcessed extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coin: '',
			oppositeCoin: '',
			amount: '...',
			address: '...',
			order: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.type === 'Deposit') {
			this.setState({
				coin: nextProps.order.pair.quote.code,
				oppositeCoin: nextProps.order.pair.base.code,
				amount: parseFloat(nextProps.order.amount_quote),
				address: nextProps.order.deposit_address ? nextProps.order.deposit_address.address : '',
				order: nextProps.order
			});
		} else if (nextProps.type === 'Receive') {
			this.setState({
				coin: nextProps.order.pair.base.code,
				oppositeCoin: nextProps.order.pair.quote.code,
				amount: parseFloat(nextProps.order.amount_base),
				address: nextProps.order.withdraw_address ? nextProps.order.withdraw_address.address : '',
				order: nextProps.order
			});
		}
	}

	render() {
		let rates = ``;
		if (this.state.order) {
			rates += `Rates at order creation: \n`;
			rates += `1 ${this.state.coin} = `;

			if (this.props.type === 'Deposit')
				rates += `${(1/this.state.order.price.rate).toFixed(8)} ${this.state.oppositeCoin}\n`;
			else if (this.props.type === 'Receive')
				rates += `${this.state.order.price.rate.toFixed(8)} ${this.state.oppositeCoin}\n`;

			rates += `1 ${this.state.coin} = `;

			if (this.props.type === 'Deposit')
				rates += `${((1/this.state.order.price.rate)*this.state.order.price.rate_usd).toFixed(8)} USD\n`;
			else if (this.props.type === 'Receive')
				rates += `${this.state.order.price.rate_usd.toFixed(8)} USD\n`;

			rates += `1 ${this.state.coin} = `;

			if (this.props.type === 'Deposit')
				rates += `${(((1/this.state.order.price.rate))*this.state.order.price.rate_btc).toFixed(8)} BTC`;
			else if (this.props.type === 'Receive')
				rates += `${this.state.order.price.rate_btc.toFixed(8)} BTC`;


			if (this.state.order.user_provided_amount === 1 && this.props.type === 'Receive') {
				rates += `\n\nWithdrawal fee: \n`;
				rates += `${this.state.order.withdrawal_fee} ${this.state.order.pair.base.code}`;
			} else if (this.state.order.user_provided_amount === 0 && this.props.type === 'Deposit') {
				rates += `\n\nWithdrawal fee: \n`;
				rates += `${this.state.order.withdrawal_fee_quote} ${this.state.order.pair.quote.code}`;
			}
		}

		return (
		    <div className="col-xs-12 col-sm-6">
		    	<div
					className={`coin-box box media ${(this.props.type === 'Deposit' && this.props.order && !this.props.order.pair.quote.is_crypto) ? 'fiat' : ''}`}>
		    		<div className="media-left">
		    			<i className={`coin-icon cc-${this.state.coin} ${this.state.coin}`}></i>
		    		</div>

		    		<div className="media-body">
			    		<h5>
			    			<b>{this.props.type} {this.state.amount} {this.state.coin}</b>

							{this.state.order ?
								<i className="fa fa-question-circle"
									data-toggle="tooltip"
									data-placement="top"
									style={{marginLeft:8}}
									data-original-title={rates}>
								</i> : null
							}
			    		</h5>
			    		<h6>{this.state.address}</h6>
		    		</div>
		    	</div>
		    </div>
		)
	}
};

export default CoinProcessed;
