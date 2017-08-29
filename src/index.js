import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

import "./js/bootstrap.min.js";
import "./js/material.min.js";
import "./js/material-kit.js";

import './css/index.scss';

import reducers from './reducers'

import Header from './components/Header';
import Footer from './components/Footer';

import App from './components/App';
import Order from './components/Order';
import NotFound from './components/NotFound';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
  		<div>
  			<Header />

  			<Switch>
  				<Route exact path="/order/:orderRef" component={Order} />
	  			<Route exact path="/" component={App} />
          <Route component={NotFound} />
	  		</Switch>

	  		<Footer />
  		</div>
  	</BrowserRouter>
  </Provider>
  , document.getElementById('root'))
