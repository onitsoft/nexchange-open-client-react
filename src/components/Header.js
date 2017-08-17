import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-fa';

import FAQ from './FAQ';

import '../css/components/Header.scss';


class Header extends Component {
	constructor(props) {
		super();

		this.state = {
			showFaqModal: false
		}
	}

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
							<a href="javascript:void(0)" onClick={() => this.setState({showFaqModal: true})}>FAQ</a>
						</li>

						<li>
							<a href="javascript:void(0)">Support</a>
						</li>

						<li>
							<a rel="tooltip" title="" data-placement="bottom" href="https://twitter.com/NexchangeIO" target="_blank" className="btn btn-simple btn-just-icon" data-original-title="Follow us on Twitter">
								<Icon name="twitter" />
							</a>
						</li>

						<li>
							<a rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/nexchange.io" target="_blank" className="btn btn-simple btn-just-icon" data-original-title="Like us on Facebook">
								<Icon name="facebook" />
							</a>
						</li>
			    	</ul>
			    </div>

			    <FAQ showModal={this.state.showFaqModal} onClose={() => this.setState({showFaqModal: false})} />
			</div>
	    );
	}
}

export default Header;
