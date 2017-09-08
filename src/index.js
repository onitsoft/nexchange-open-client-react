import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

import "./js/bootstrap.min.js";
import "./js/material.min.js";
import "./js/material-kit.js";

import './css/index.scss';

import reducers from './reducers'

import asyncComponent from './components/AsyncComponent';
import Referrals from './components/Referrals';
import Header from './components/Header';
import Footer from './components/Footer';

const AsyncApp = asyncComponent(() => import("./components/App"));
const AsyncOrder = asyncComponent(() => import("./components/Order"));
const AsyncNotFound = asyncComponent(() => import("./components/NotFound"));

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
  		<div>
        <Referrals />
  			<Header />

  			<Switch>
  				<Route exact path="/order/:orderRef" component={AsyncOrder} />
	  			<Route exact path="/" component={AsyncApp} />
          <Route component={AsyncNotFound} />
	  		</Switch>

	  		<Footer />
  		</div>
  	</BrowserRouter>
  </Provider>
  , document.getElementById('root'))
