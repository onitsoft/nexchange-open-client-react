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
				                <h1 className="header-text"><span className="text-green">K</span>RİPTO<span className="text-green">B</span>ÜROSU</h1>
							</div>
				      	</Link>
				    </div>

				    <div className="collapse navbar-collapse" id="navigation-index">
				    	<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="javascript:void(0)" onClick={() => this.setState({showSupportModal: true})} onClick={() => scrollToElement('#team')}>Hakkımızda</a>
							</li>
				    	
							<li>
								<a href="javascript:void(0)" onClick={() => this.setState({showFaqModal: true})}>S.S.S.</a>
							</li>

							<li>
								<a href="javascript:void(0)" onClick={() => this.setState({showSupportModal: true})}>Destek</a>
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
