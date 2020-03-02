import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './i18n';
import i18n from 'i18next';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

import ToTop from 'Components/misc/ToTop';

import reducers from './reducers';

import { BreakpointProvider, defaultQuery } from 'Components/misc/breakpoint';

import Intercom from './services/intercom';

import Home from 'Components/Home/Home';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
import NotFound from 'Components/NotFound/NotFound';
import Referrals from 'Components/Referrals/Referrals';

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

const FAQ = React.lazy(() => import(/* webpackChunkName: "FAQ" */ 'Components/FAQ2/FAQ'));
const Pair = React.lazy(() => import(/* webpackChunkName: "Pair" */ 'Components/Pair/Pair'));

const TermsConditions = React.lazy(() => import(/* webpackChunkName: "TermsConditions" */ 'Components/TermsConditions/TermsConditions'));
const Privacy = React.lazy(() => import(/* webpackChunkName: "Privacy" */ 'Components/Privacy/Privacy'));
const SignIn = React.lazy(() => import(/* webpackChunkName: "SignIn" */ 'Components/Accounts/SignIn/SignIn'));
const SignOut = React.lazy(() => import(/* webpackChunkName: "SignOut" */ 'Components/Accounts/SignOut/SignOut'));
const SignUp = React.lazy(() => import(/* webpackChunkName: "SignUp" */ 'Components/Accounts/SignUp/SignUp'));
const Orders = React.lazy(() => import(/* webpackChunkName: "Orders" */ 'Components/Accounts/Orders'));
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "ForgotPassword" */ 'Components/Accounts/ForgotPassword/ForgotPassword')
);
const Order = React.lazy(() => import(/* webpackChunkName: "Order" */ 'Components/Order/Order'));
const WhiteLabelSEO = React.lazy(() => import(/* webpackChunkName: "WhiteLabelSEO" */ 'Pages/WhiteLabelSEO'));
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ 'Pages/Profile'));
const NotFoundRedirect = () => <Redirect to={`/${i18n.language}/not-found`} />;

ReactDOM.render(
  <Provider store={store}>
    <BreakpointProvider queries={defaultQuery}>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <ToTop>
            <Referrals />
            <Header />

            <Switch>
              <Redirect exact from="/" to="/en" />
              <Route exact path="/:lang/terms-and-conditions" component={TermsConditions} />
              <Route exact path="/:lang/privacy" component={Privacy} />
              <Route exact path="/:lang/profile/:user?" component={Profile} />
              <Route exact path="/:lang/order/:orderRef" component={Order} />
              <Route exact path="/:lang/orders/:orderRef?" component={Orders} />
              <Route exact path="/:lang" render={props => <Home {...props} store={store} />} />
              <Route exact path="/:lang/instant-white-label/" component={WhiteLabelSEO} />
              <Route exact path="/:lang/faqs/:id?" component={FAQ} />
              <Route exact path="/:lang/signin" component={SignIn} />
              <Route exact path="/:lang/signout" component={SignOut} />
              <Route exact path="/:lang/signup" component={SignUp} />
              <Route exact path="/:lang/forgot-password/:resetToken?" component={ForgotPassword} />
              <Route exact path="/:lang/convert/:quote-to-:base" render={props => <Pair {...props} store={store} />} />
              <Route exact path="/:lang/not-found" component={NotFound} />
              <Route component={NotFoundRedirect} />
            </Switch>

            <Footer />
            <Intercom />
          </ToTop>
        </BrowserRouter>
      </Suspense>
    </BreakpointProvider>
  </Provider>,
  document.getElementById('root')
);
