import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-fa';
import scrollToElement from 'scroll-to-element';

import FAQ from './FAQ';
import Support from './Support';


class NotFound extends Component {
	constructor(props) {
		super();

		this.state = {
			showFaqModal: false,
			showSupportModal: false
		}
	}

	render() {
	    return (
			<div id="not-found" className="text-center">
				<h1>404</h1>
				<h2>Page not found :(</h2>
			</div>
	    );
	}
}

export default NotFound;
