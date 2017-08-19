import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

class OrderStatus extends Component {
  render() {
    return (
      <div id="order-status">
      	<hr/>
      	
    		<div id="step-one" className={(this.props.status > 1 || this.props.status == -1) ? "step done" : "step active"}>
    			<h4>1. Awaiting deposit {this.props.status > 1 || this.props.status == -1 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>}</h4>
    		</div>

     		<div id="step-two" className={this.props.status == -1 ? "step active" : (this.props.status >= 2 ? "step done" : "step")}>
    			<h4>2. Awaiting confirmations {this.props.status == -1 ? <i className="fa fa-clock-o"></i> : (this.props.status >= 2 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>)}</h4> 
    		</div>
    		
    		<div id="step-three" className={this.props.status >= 2 ? "step active" : "step"}>
    			<h4>3. All done {this.props.status < 2 ? <i className="fa fa-clock-o"></i> : (this.props.status > 2 ? <i className="fa fa-check"></i> : <i className="fa fa-clock-o"></i>)}</h4>
    		</div>
      </div>
    );
  }
}

export default OrderStatus;
