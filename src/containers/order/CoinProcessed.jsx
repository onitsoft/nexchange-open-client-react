import React, { Component } from 'react';

class CoinProcessed extends Component {
	constructor(props) {
		super(props);

		if (this.props.type === 'Deposit') {
			this.state = {
				coin: this.props.order.pair.quote.code,
				oppositeCoin: this.props.order.pair.base.code,
				amount: parseFloat(this.props.order.amount_quote),
				address: this.props.order.deposit_address ? this.props.order.deposit_address.address : '',
				order: this.props.order
			};
		} else if (this.props.type === 'Receive') {
			this.state = {
				coin: this.props.order.pair.base.code,
				oppositeCoin: this.props.order.pair.quote.code,
				amount: parseFloat(this.props.order.amount_base),
				address: this.props.order.withdraw_address ? this.props.order.withdraw_address.address : '',
				order: this.props.order
			};
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
					className={`coin-box box media ${(this.props.type === 'Deposit' && Helpers.isFiatOrder(this.props.order)) ? 'fiat' : ''}`}>
		    		<div className="media-left">
		    			<i className={`coin-icon cc-${this.state.coin} ${this.state.coin}`}></i>
		    		</div>

		    		<div className="media-body">
			    		<h5>
			    			<b>{this.props.type} {this.state.amount} {this.state.coin}</b>

							<i className="fa fa-question-circle"
								data-toggle="tooltip"
								data-placement="top"
								style={{marginLeft:8}}
								data-original-title={rates}>
							</i> 
			    		</h5>
			    		<h6>{this.state.address}</h6>
		    		</div>
		    	</div>
		    </div>
		)
	}
};

export default CoinProcessed;
