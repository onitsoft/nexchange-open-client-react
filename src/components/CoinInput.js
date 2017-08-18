import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAlert } from '../actions/index.js'

import CoinSelector from './CoinSelector';


class CoinInput extends Component {

	constructor(props) {
		super();
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.errorAlert({
				message: 'Blah blah blah',
				show: true
			});
		}, 2000);

	}

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

function mapDispatchToProps(dispatch) {
	// Whenever selectBook is called, the
	// result should be passed to all reducers
	return bindActionCreators({ errorAlert: errorAlert }, dispatch)
}

export default connect(null, mapDispatchToProps)(CoinInput);
