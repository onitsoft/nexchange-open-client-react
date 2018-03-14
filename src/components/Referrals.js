import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Helpers from '../helpers';
import config from '../config';


class Referrals extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		axios.interceptors.request.use(function (requestConfig) {
			let referral = (config.REFERRAL_CODE ? config.REFERRAL_CODE : localStorage.getItem('referral'));
			if (referral && requestConfig.url && requestConfig.url.indexOf(config.API_BASE_URL.toLowerCase()) > -1)
				requestConfig.headers['x-referral-token'] = referral;

		    return requestConfig;
		}, function (error) {
		    return Promise.reject(error);
		});
	}

	redirectRef() {
		let urlWithoutRef = window.location.pathname + window.location.search + window.location.hash;
		urlWithoutRef = urlWithoutRef.substring(0, urlWithoutRef.indexOf('?'));

		return <Redirect to={urlWithoutRef} />
	}

	render() {
		let params = Helpers.urlParams();
		if (params != null && params.hasOwnProperty('ref')) {
			localStorage.setItem('referral', params['ref']);
			return this.redirectRef();
		}

	    return null;
	}
}

export default Referrals;
