import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './i18n';

import Referrals from 'Components/Referrals/Referrals';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import NotFound from 'Components/NotFound/NotFound';
import FAQ from 'Components/FAQ/FAQ';

import Home from 'Components/Home/Home';
import Order from 'Components/Order/Order';
import TermsConditions from 'Components/TermsConditions/TermsConditions';
import Privacy from 'Components/Privacy/Privacy';
import SignIn from 'Components/Accounts/SignIn/SignIn';
import SignUp from 'Components/Accounts/SignUp/SignUp';
import WhiteLabelSEO from 'Pages/WhiteLabelSEO';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

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
require('Utils/bindGa');

const NotFoundRedirect = () => <Redirect to='/not-found' />

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
          <Route exact path="/" render={props => <Home {...props} store={store} />} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} /> 
          <Route exact path="/faqs/:id?" component={FAQ} />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/whitelabel/" component={WhiteLabelSEO} />
          <Route component={NotFoundRedirect} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
