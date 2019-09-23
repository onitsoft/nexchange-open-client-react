import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './i18n';

import Referrals from '#components/Referrals/Referrals';
import Header from '#components/Header/Header';
import Footer from '#components/Footer/Footer';
import NotFound from '#components/NotFound/NotFound';
import FAQ from '#components/FAQ/FAQ';

import Home from '#components/Home/Home';
import Order from '#components/Order/Order';
import TermsConditions from '#components/TermsConditions/TermsConditions';
import Privacy from '#components/Privacy/Privacy';

import setAuthToken from '#utils/setAuthToken';
import crispEmailBinding from '#utils/crispEmailBinding';

import reducers from './reducers';
import './css/index.scss';

window.$ = window.jQuery = require('jquery');
require('./js/bootstrap.min.js');

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

setAuthToken();
crispEmailBinding(store);
require('#utils/bindGa');

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
          <Route exact path="/" render={props => <Home {...props} store={store} />} /> />
          <Route exact path="/faqs/:id?" component={FAQ} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
