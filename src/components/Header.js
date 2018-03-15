import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {Icon} from 'react-fa';
import scrollToElement from 'scroll-to-element';

import FAQ from './FAQ';
import Support from './Support';


class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showFaqModal: false,
			showSupportModal: false
		}
	}

	componentDidMount() {
		let hash = window.location.hash;
		if (hash && hash != '') {
			hash = hash.replace('#', '');

			let el = document.getElementById(hash);
			if (el) el.scrollIntoView();
		}
	}

	render() {
	    return (
	    	<div id="header">
				<div className="container">
				    <div className="navbar-header">
				    	<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
				        	<span className="sr-only">Toggle navigation</span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				        	<span className="icon-bar"></span>
				    	</button>

				    	<Link to="/">
				        	<div className="logo-container">
				        		<img src="/img/logo.png" />
				                <h1 className="header-text">E<span className="text-green">X</span>CHANGE</h1>
							</div>
				      	</Link>
				    </div>

				    <div className="collapse navbar-collapse" id="navigation-index">
				    	<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="/#about" onClick={() => scrollToElement('#about')}>About</a>
							</li>

							<li>
								<a href="javascript:void(0)" onClick={() => this.setState({showFaqModal: true})}>FAQ</a>
							</li>

				    		<li>
				    			<a href="http://docs.nexchange2.apiary.io/" target="_blank" onClick={() => ga('send', 'event', 'General', 'api docs click')}>API Docs</a>
				    		</li>

							<li>
								<a href="/#compare" onClick={() => scrollToElement('#compare')}><span className="hidden-sm">Compare </span>Rates</a>
							</li>

							<li>
								<a href="javascript:void(0)" onClick={() => this.setState({showSupportModal: true})}>Support</a>
							</li>

							<li className="social-mobile">
								<a href="https://twitter.com/NexchangeIO" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
									<i className="fa fa-twitter" aria-hidden="true"></i>
								</a>

								<a href="https://www.facebook.com/nexchange.io" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
									<i className="fa fa-facebook" aria-hidden="true"></i>
								</a>

								<a href="https://join.slack.com/t/nexchangecommunity/shared_invite/MjM0OTU1ODc4NTkyLTE1MDQ0Mzc3NjEtYzZiMTYxMjdhNA" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
									<i className="fa fa-slack" aria-hidden="true"></i>
								</a>

								<a href="https://t.me/joinchat/F5JKfhGOMrzDKsJSmPbf9Q" target="_blank" className="btn btn-simple btn-just-icon visible-xs">
									<i className="fa fa-telegram" aria-hidden="true"></i>
								</a>
							</li>

							<li className="visible-sm visible-md visible-lg">
								<a href="https://twitter.com/NexchangeIO" target="_blank" className="btn btn-simple btn-just-icon" rel="tooltip" title="" data-placement="bottom" data-original-title="Follow us on Twitter">
									<i className="fa fa-twitter" aria-hidden="true"></i>
								</a>
							</li>

							<li className="visible-sm visible-md visible-lg">
								<a href="https://www.facebook.com/nexchange.io" target="_blank" className="btn btn-simple btn-just-icon" rel="tooltip" title="" data-placement="bottom" data-original-title="Like us on Facebook">
									<i className="fa fa-facebook" aria-hidden="true"></i>
								</a>
							</li>

							<li className="visible-sm visible-md visible-lg">
								<a href="https://join.slack.com/t/nexchangecommunity/shared_invite/MjM0OTU1ODc4NTkyLTE1MDQ0Mzc3NjEtYzZiMTYxMjdhNA" target="_blank" className="btn btn-simple btn-just-icon" rel="tooltip" title="" data-placement="bottom" data-original-title="Join us on Slack">
									<i className="fa fa-slack" aria-hidden="true"></i>
								</a>
							</li>

							<li className="visible-sm visible-md visible-lg">
								<a href="https://t.me/joinchat/F5JKfhGOMrzDKsJSmPbf9Q" target="_blank" className="btn btn-simple btn-just-icon" rel="tooltip" title="" data-placement="bottom" data-original-title="Join us on Telegram">
									<i className="fa fa-telegram" aria-hidden="true"></i>
								</a>
							</li>
				    	</ul>
				    </div>

				    <FAQ show={this.state.showFaqModal} onClose={() => this.setState({showFaqModal: false})} />
				    <Support show={this.state.showSupportModal} onClose={() => this.setState({showSupportModal: false})} />
				</div>
			</div>
	    );
	}
}

export default Header;
