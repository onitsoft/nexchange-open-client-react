import React, { Component } from 'react';
import '../css/components/Header.scss';

class Header extends Component {
  render() {
    return (
    	<header>
			<div className="container">
			  <h1 className="header-text">NEXCHANGE</h1>
			</div>
    	</header>
    );
  }
}

export default Header;
