import React, { Component } from 'react';
import ExchangeWidget from '../components/ExchangeWidget';

class Main extends Component {
  render() {
    return (
		<div id="main" className="header">
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div className="brand">
					        <h1>Exchange crypto-currencies</h1>
					        <h3>Simple. Secure. Transparent.</h3>
						</div>
					</div>

					<ExchangeWidget />
				</div>
			</div>
		</div>
    );
  }
}

export default Main;
