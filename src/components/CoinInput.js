import React, { Component } from 'react';
import CoinSelector from './CoinSelector';
//import '../css/components/CoinInput.scss';

class CoinInput extends Component {

  render() {
    return (
      <div className="form-group label-floating has-success">
        <label htmlFor={this.props.type} className="control-label">{this.props.type}</label>
        <input type="text" className="form-control coin" id={`coin-input-${this.props.type}`} name={this.props.type} value={this.props.value} onChange={this.props.onChange} />

        <CoinSelector selectedCoin={this.props.selectedCoin} type={this.props.type} onCoinSelect={this.props.onCoinSelect} />
      </div>
    );
  }
}

export default CoinInput;
