import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import CopyToClipboard from 'react-copy-to-clipboard';


class Order extends Component {

	constructor(props) {
		super(props);

		this.state = {
			copied: false,
			address: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
		};
	}

	triggerCopyTooltip() {
		this.setState({copied: true});
		setTimeout(() => this.setState({copied: false}), 1000)
	}

	render() {
		return (
			<div id="order">
				<div className="container">
					<div className="row">
					    <div className="col-xs-12">
					    	<h3 id="order-ref">Order Reference: <b>{this.props.match.params.orderRef}</b></h3>
					    </div>
					</div>

					<div className="row">
					    <div className="col-xs-12 col-sm-6">
					    	<div className="box media">
					    		<div className="media-left">
					    			<i className={`coin-icon BTC`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Deposit 1 BTC</b></h5>
						    		<h6>0x123f681646d4a755815f9cb19e1acc8565a0c2ac</h6>
					    		</div>
					    	</div>
					    </div>

					    <div className="col-xs-12 col-sm-6">
					    	<div className="box media">
					    		<div className="media-left">
					    			<i className={`coin-icon ETH`}></i>
					    		</div>

					    		<div className="media-body">
						    		<h5><b>Receive 25 ETH</b></h5>
						    		<h6>0x123f681646d4a755815f9cb19e1acc8565a0c2ac</h6>
					    		</div>
					    	</div>
					    </div>

					    <div className="col-xs-12">
					    	<div className="box">
					    		<div className="row">
					    			<div className="col-xs-12 col-sm-3">
					    				<img src="https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=bitcoin:1KTFHHwtdNmGrbY5MfWhtswpG9tuxZwwoA?amount=0.0363" />
					    			</div>

					    			<div className="col-xs-12 col-sm-9">
					    				<h4 className="text-success">Time remaining: TIMER HERE</h4>

					    				<h3>Send <b>1 BTC</b> to the address<br/>
					    					<b id="deposit-address">0x123f681646d4a755815f9cb19e1acc8565a0c2ac</b>
					    				</h3>

								        <CopyToClipboard text={this.state.address}
								          onCopy={() => this.triggerCopyTooltip()}>
											<button id="copyToClipboard" type="button" className="btn btn-default">
												<div className={this.state.copied ? "tooltip top in" : "tooltip"} role="tooltip">
													<div className="tooltip-arrow"></div>
													<div className="tooltip-inner">Adddress copied!</div>
												</div>
												Copy the address
											</button>
					    				</CopyToClipboard>
					    			</div>

					    			
					    		</div>

					    		<div className="row">
					    			<div className="col-xs-12">
						    			AWAITING DEPOSIT
						    			AWAITING EXCHANGE
						    			ALL DONE
					    			</div>
					    		</div>

					    		
					    	</div>
					    </div>
					</div>

					<div className="row">
					    <div className="col-xs-12">

					    </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Order;