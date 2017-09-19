import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import config from '../config';


class Referrals extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		axios.interceptors.request.use(function (requestConfig) {
			let referral = (config.REFERRAL_CODE ? config.REFERRAL_CODE : localStorage.getItem('referral'));
		    if (referral && config.url && config.url.indexOf(config.API_BASE_URL) > -1) {
			    requestConfig.headers['x-referral-token'] = referral;
			}

		    return requestConfig;
		  }, function (error) {
		    return Promise.reject(error);
		  });
	}

	isRef() {
		let url = window.location.search.substring(1),
			params = url.split('&');

		for (let i = 0; i < params.length; i++) {
			let param = params[i].split('=');

			if (param[0] == 'ref') {
				localStorage.setItem('referral', param[1]);
				return true;
			}
		}

		return false;
	}

	redirectRef() {
		let urlWithoutRef = window.location.pathname + window.location.search + window.location.hash;
		urlWithoutRef = urlWithoutRef.substring(0, urlWithoutRef.indexOf('?'));

		return <Redirect to={urlWithoutRef} />
	}

	render() {
		if (this.isRef())
			return this.redirectRef();

	    return null;
	}
}

export default Referrals;
