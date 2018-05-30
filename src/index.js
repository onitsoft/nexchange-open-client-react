import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import './css/index.scss';

import reducers from './reducers';
import Loadable from 'react-loadable';

import LoadingComponent from './components/LoadingComponent';
import Referrals from './components/Referrals';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './containers/Home';
import Order from './containers/order/Order';
import TermsConditions from './containers/TermsConditions';
import Privacy from './containers/Privacy';

import setAuthToken from './helpers/setAuthToken';
import crispEmailBinding from './helpers/crispEmailBinding';

window.$ = window.jQuery = require('jquery');

require('./js/bootstrap.min.js');
require('./js/material.min.js');
require('./js/material-kit.js');

const AsyncNotFound = Loadable({
  loader: () => import('./components/NotFound'),
  loading: LoadingComponent,
});

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
          <Route component={AsyncNotFound} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
