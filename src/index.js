import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './i18n';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

import ToTop from 'Components/misc/ToTop'

import reducers from './reducers';

import { BreakpointProvider, defaultQuery } from 'Components/misc/breakpoint'

import GraphCMSProvider from './services/graphcms'
import Intercom from './services/intercom'
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

const Referrals = React.lazy(() => import('Components/Referrals/Referrals'))
const Header = React.lazy(() => import('Components/Header/Header'))
const Footer = React.lazy(() => import('Components/Footer'))
const NotFound = React.lazy(() => import('Components/NotFound/NotFound'))
const FAQ = React.lazy(() => import('Components/FAQ2/FAQ'))
const Pair = React.lazy(() => import('Components/Pair/Pair'))

const Home = React.lazy(() => import('Components/Home/Home'))
const TermsConditions = React.lazy(() => import('Components/TermsConditions/TermsConditions'))
const Privacy = React.lazy(() => import('Components/Privacy/Privacy'))
const SignIn = React.lazy(() => import('Components/Accounts/SignIn/SignIn'))
const SignOut = React.lazy(() => import('Components/Accounts/SignOut/SignOut'))
const SignUp = React.lazy(() => import('Components/Accounts/SignUp/SignUp'))
const ForgotPassword = React.lazy(() => import('Components/Accounts/ForgotPassword/ForgotPassword'))
const Order = React.lazy(() => import('Components/Order/Order'))
const WhiteLabelSEO = React.lazy(() => import('Pages/WhiteLabelSEO'))
const Profile = React.lazy(() => import('Pages/Profile'))

ReactDOM.render((
  <GraphCMSProvider>
    <Provider store={store}>
      <BreakpointProvider queries={defaultQuery}>
        <BrowserRouter>
          <Suspense fallback={<></>}>
            <ToTop>
              <Referrals />
              <Header />

              <Switch>
                <Route exact path="/terms-and-conditions" component={TermsConditions} />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/profile/:user?" component={Profile} />
                <Route exact path="/order/:orderRef" component={Order} />
                <Route exact path="/"
                  render={props =>  <Home {...props} store={store} />}
                />
                <Route exact path="/instant-white-label/" component={WhiteLabelSEO} />
                <Route exact path="/faqs/:id?" component={FAQ} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signout" component={SignOut} />
                <Route exact path="/signup" component={SignUp} /> 
                <Route exact path="/forgot-password/:resetToken?" component={ForgotPassword} /> 
                <Route exact path="/convert/:quote-to-:base"
                  render={props =>  <Pair {...props} store={store} />} />
                <Route exact path="/not-found" component={NotFound} />
                <Route component={NotFoundRedirect} />
              </Switch>

              <Footer />
              <Intercom />
            </ToTop>
          </Suspense>
        </BrowserRouter>
      </BreakpointProvider>
    </Provider>
  </GraphCMSProvider>
  ),
  document.getElementById('root')
);
