import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {Icon} from 'react-fa'

import '../css/components/Header.scss';

class Header extends Component {
  render() {
    return (
		<div id="header" className="container">
	        <div className="navbar-header">
		    	<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
		        	<span className="sr-only">Toggle navigation</span>
		        	<span className="icon-bar"></span>
		        	<span className="icon-bar"></span>
		        	<span className="icon-bar"></span>
		    	</button>

		    	<Link to="/">
		        	<div className="logo-container">
		                <h1 className="header-text">NEXCHANGE</h1>
					</div>
		      	</Link>
		    </div>

		    <div className="collapse navbar-collapse" id="navigation-index">
		    	<ul className="nav navbar-nav navbar-right">
					<li>
						<a href="javascript:void(0)">FAQ</a>
					</li>

					<li>
						<a href="javascript:void(0)">Support</a>
					</li>

					<li>
						<a rel="tooltip" title="" data-placement="bottom" href="https://twitter.com/cryptoNexchange" target="_blank" className="btn btn-simple btn-just-icon" data-original-title="Follow us on Twitter">
							<Icon name="twitter" />
						</a>
					</li>

					<li>
						<a rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/cryptoNexchange" target="_blank" className="btn btn-simple btn-just-icon" data-original-title="Like us on Facebook">
							<Icon name="facebook" />
						</a>
					</li>
		    	</ul>
		    </div>
		</div>
    );
  }
}

export default Header;


