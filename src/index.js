import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import Referrals from './components/Referrals/Referrals';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

import Home from './components/Home/Home';
import Order from './components/Order/Order';
import TermsConditions from './components/TermsConditions/TermsConditions';
import Privacy from './components/Privacy/Privacy';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

import reducers from './reducers';
import './css/index.scss';

window.$ = window.jQuery = require('jquery');

require('./js/bootstrap.min.js');
require('./js/material.min.js');
require('./js/material-kit.js');
require('react-fa');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

setAuthToken();
crispEmailBinding(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Referrals />
        <Header />

        <Switch>
          <Route exact path="/terms-and-conditions" component={TermsConditions} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/order/:orderRef" component={Order} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
