import React from 'react';
import scrollToElement from 'scroll-to-element';

import ExchangeWidget from '../containers/ExchangeWidget';
import CoinPrices from '../containers/CoinPrices';
import ErrorAlert from '../components/ErrorAlert';


const Hero = () => (
	<div id="hero">
		<ErrorAlert />

		<div className="container">
			<div className="row">
				<div className="col-xs-12">
					<div className="brand">
				        <h1>Dijital Para Takası</h1>
				        <h2>Hızlı. <span className="text-green">Güvenli</span>. Gizli.</h2>
					</div>
				</div>

				<ExchangeWidget />
				<CoinPrices />
			</div>
		</div>

		<div id="mouse-scroll" onClick={() => scrollToElement('#team')}>
			<span className="arrow-1" aria-hidden="true"></span>
			<span className="arrow-2" aria-hidden="true"></span>
			<span className="arrow-3" aria-hidden="true"></span>
		</div>
	</div>
);

export default Hero;
