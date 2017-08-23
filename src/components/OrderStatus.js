import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    let width = "0%";

    if (this.props.status > 2) {
      width = "100%";
    } else if (this.props.status == 2) {
      width = "66.6%";
    } else if (this.props.status == -1) {
      width = "33.3%";
    }

    return (
      <div id="order-status">
      	<hr/>
      	
    		<div id="step-one" className={(this.props.status > 1 || this.props.status == -1) ? "step done" : "step active"} data-toggle="tooltip" data-placement="top" title="" data-original-title="In this step we are waiting for your deposit.">
          <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
    			<h4>1. Awaiting deposit</h4>
    		</div>

     		<div id="step-two" className={this.props.status == -1 ? "step active" : (this.props.status >= 2 ? "step done" : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="Your order is on the blockchain, we are now waiting for the required number of confirmations before you can receive your funds.">
          <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
    			<h4>2. Awaiting confirmations</h4> 
    		</div>
    		
    		<div id="step-three" className={this.props.status == 2 ? "step active" : (this.props.status >= 3 ? "step done" : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="We got the funds and now have transferred our funds to you.">
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
