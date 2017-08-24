import React, { Component } from 'react';
import '../css/components/Footer.scss';

class Footer extends Component {
  render() {
    return (
    	<footer>
			<div className="container">
			  <p className="text-muted">&copy; Nexchange Open Client BETA</p>
			</div>
    	</footer>
    );
  }
}

export default Footer;
