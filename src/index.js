import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import Referrals from 'Components/Referrals/Referrals';
import TokenSet from 'Components/TokenSet/TokenSet';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import NotFound from 'Components/NotFound/NotFound';

import Home from 'Components/Home/Home';
import Order from 'Components/Order/Order';
import TermsConditions from 'Components/TermsConditions/TermsConditions';
import Privacy from 'Components/Privacy/Privacy';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

import reducers from './reducers';
import './css/index.scss';

window.$ = window.jQuery = require('jquery');
require('./js/bootstrap.min.js');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

setAuthToken();
crispEmailBinding(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Referrals />
        <TokenSet />
        <Header />

        <Switch>
          <Route exact path="/terms-and-conditions" component={TermsConditions} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/order/:orderRef" component={Order} />
          <Route exact path="/" render={props => <Home {...props} store={store} />} /> />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
