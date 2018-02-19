import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { fetchPrice } from '../actions/index.js';
import CoinSelector from './CoinSelector';


class CoinInput extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			value: '...'
		}

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		let pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
		let data = {
			pair: pair,
			lastEdited: this.props.type
		};

		data[this.props.type] = event.target.value;
		this.setState({value: event.target.value});
		this.props.fetchPrice(data);

		ga('send', 'event', 'Order', 'change amount');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.type === 'receive') {
			this.setState({ value: nextProps.price.receive });
		} else if (nextProps.type === 'deposit') {
			this.setState({ value: nextProps.price.deposit });
		}
	}

	render() {
		return (
		  <div className="form-group label-floating has-success is-focused">
		    <label htmlFor={this.props.type} className="control-label text-green">{this.props.type}</label>
		    <input type="text"
					className="form-control coin"
					id={`coin-input-${this.props.type}`}
					name={this.props.type}
					onChange={this.onChange}
					value={this.state.value}
				/>

		    <CoinSelector type={this.props.type} />
		  </div>
		);
	}
}


function mapStateToProps(state) {
	return {
		selectedCoin: state.selectedCoin,
		price: state.price
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPrice: fetchPrice,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinInput);
