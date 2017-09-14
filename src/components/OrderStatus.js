import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

const STATUS_CODES = {
  0: 'CANCELLED',
  11: 'INITIAL',
  12: 'PAID_UNCONFIRMED',
  13: 'PAID',
  14: 'PRE_RELEASE',
  15: 'RELEASE',
  16: 'COMPLETED'
}


class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    let width = "0%";

    if (STATUS_CODES[this.props.status] == 'COMPLETED') {
      width = "100%";
    } else if (STATUS_CODES[this.props.status] == 'RELEASE') {
      width = "90%";
    } else if (STATUS_CODES[this.props.status] == 'PAID') {
      width = "66.6%";
    } else if (STATUS_CODES[this.props.status] == 'PAID_UNCONFIRMED') {
      width = "33.3%";
    }

    return (
      <div id="order-status">
      	<hr/>
      	
    		<div id="step-one" className={(this.props.status == 14 || this.props.status == 0) ? "step" : (this.props.status > 11 ? "step done" : "step active")} data-toggle="tooltip" data-placement="top" title="" data-original-title="In this step we are waiting for your deposit.">
          <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
    			<h4>1. Awaiting deposit</h4>
    		</div>

     		<div id="step-two" className={STATUS_CODES[this.props.status] == 'PAID_UNCONFIRMED' ? "step active" : (this.props.status >= 13 && this.props.status != 14 ? "step done" : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="Your order is on the blockchain, we are now waiting for the required number of confirmations before you can receive your funds.">
          <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
    			<h4>2. Awaiting confirmations</h4> 
    		</div>
    		
    		<div id="step-three" className={this.props.status == 13 ? "step active" : (this.props.status >= 15 ? (this.props.status == 15 ? "step active" : "step done" ) : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="We got the funds and now have transferred our funds to you.">
          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
    			<h4>3. All done</h4>
    		</div>

        <div className="progres-container">
          <div className="progress progress-line-info">
            <div className="progress-bar progress-bar-info" role="progressbar" style={{"width": width}}>
              <span className="sr-only">{width} Complete</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStatus;
