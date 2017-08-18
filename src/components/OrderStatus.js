import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

class OrderStatus extends Component {

  render() {
    return (
      <div id="order-status">
      	<hr/>
      	
  		<div id="step-one" className="step">
  			<span className="step-text active">1. Awaiting deposit</span>
  		</div>

   		<div id="step-two" className="step">
  			<span className="step-text">2. Awaiting confirmations</span>
  		</div>
  		
  		<div id="step-three" className="step">
  			<span className="step-text">3. All done</span>
  		</div>
      </div>
    );
  }
}

export default OrderStatus;
