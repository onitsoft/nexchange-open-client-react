import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    return (
      <div id="order-status">
      	<hr/>
      	
    		<div id="step-one" className={(this.props.status > 1 || this.props.status == -1) ? "step done" : "step active"}>
    			<h4 data-toggle="tooltip" data-placement="top" title="" data-original-title="In this step we are waiting for your deposit.">1. Awaiting deposit {this.props.status > 1 || this.props.status == -1 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>}</h4>
    		</div>

     		<div id="step-two" className={this.props.status == -1 ? "step active" : (this.props.status >= 2 ? "step done" : "step")}>
    			<h4 data-toggle="tooltip" data-placement="top" title="" data-original-title="We can see that your order is on the blockchain and are now waiting for the required number of confirmations.">2. Awaiting confirmations {this.props.status == -1 ? <i className="fa fa-clock-o"></i> : (this.props.status >= 2 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>)}</h4> 
    		</div>
    		
    		<div id="step-three" className={this.props.status >= 2 ? "step active" : "step"}>
    			<h4 data-toggle="tooltip" data-placement="top" title="" data-original-title="We got the funds and now have transferred our funds to you.">3. All done {this.props.status < 2 ? <i className="fa fa-clock-o"></i> : (this.props.status > 2 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>)}</h4>
    		</div>
      </div>
    );
  }
}

export default OrderStatus;
