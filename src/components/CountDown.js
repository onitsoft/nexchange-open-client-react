import React, { Component } from 'react';
import moment from 'moment';


class CountDown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: null,
			initialTimeSet: null
		}
	}

	componentDidMount() {
		$(function () {
		    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
		});

		this.setState({
			initialTimeSet: this.state.time
		})

		this.interval = setInterval(() => {
			this.setState({
				time: this.state.time - 1000
			})
		}, 1000);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.time != this.state.initialTimeSet) {
			this.setState({
				time: nextProps.time,
				initialTimeSet: nextProps.time
			})
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		if (this.state.time <= 0)
			return <h5>{this.props.expiredMsg}</h5>

		return <h5>{this.props.defaultMsg} {this.state.time ? moment.utc(this.state.time).format('mm:ss') : '...'} {this.props.info}</h5>
	}

};

export default CountDown;
