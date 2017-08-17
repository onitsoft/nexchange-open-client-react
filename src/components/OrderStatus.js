import React, { Component } from 'react';
import CoinSelector from './CoinSelector';

class OrderStatus extends Component {

  render() {
    return (
      <div id="order-status">
  		<div id="step-one" className="step">
  			1. Awaiting deposit
  		</div>

   		<div id="step-two" className="step">
  			2. Awaiting confirmations
  		</div>
  		
  		<div id="step-three" className="step">
  			3. All done 
  		</div>
      </div>
    );
  }
}

export default OrderStatus;
