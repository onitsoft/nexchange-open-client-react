import React, { Suspense } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import './i18n';
import i18n from 'i18next';

import setAuthToken from 'Utils/setAuthToken';
import crispEmailBinding from 'Utils/crispEmailBinding';

import ToTop from 'Components/misc/ToTop';

import reducers from './reducers';

import { BreakpointProvider, defaultQuery } from 'Components/misc/breakpoint';

import GraphCMSProvider from './services/graphcms';
import Intercom from './services/intercom';
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

const Referrals = React.lazy(() => import('Components/Referrals/Referrals'));
const Header = React.lazy(() => import('Components/Header/Header'));
const Footer = React.lazy(() => import('Components/Footer'));
const Announcement = React.lazy(() => import('Components/misc/Anouncement/Anouncement'));
const NotFound = React.lazy(() => import('Components/NotFound/NotFound'));
const FAQ = React.lazy(() => import('Components/FAQ2/FAQ'));
const About = React.lazy(() => import('Components/Home/About/About'));
const Pair = React.lazy(() => import('Components/Pair/Pair'));

const Home = React.lazy(() => import('Components/Home/Home'));
const TermsConditions = React.lazy(() => import('Components/TermsConditions/TermsConditions'));
const Privacy = React.lazy(() => import('Components/Privacy/Privacy'));
const SignIn = React.lazy(() => import('Components/Accounts/SignIn/SignIn'));
const SignOut = React.lazy(() => import('Components/Accounts/SignOut/SignOut'));
const SignUp = React.lazy(() => import('Components/Accounts/SignUp/SignUp'));
const Orders = React.lazy(() => import('Components/Accounts/Orders'));
const ForgotPassword = React.lazy(() => import('Components/Accounts/ForgotPassword/ForgotPassword'));
const Order = React.lazy(() => import('Components/Order/Order'));
const WhiteLabelSEO = React.lazy(() => import('Pages/WhiteLabelSEO'));
const Profile = React.lazy(() => import('Pages/Profile'));
// const PriceComparison = React.lazy(() => import('Components/Home/PriceComparison/PriceComparison'))
// const Team = React.lazy(() => import('Components/Home/Team/Team'))
// const About = React.lazy(() => import('Components/Home/About/About'))

const Container = styled.div`
  position: relative;
`;

const App = () => {
  const languages = ['en', 'de', 'ru'];
  let lang = i18n.language || window.localStorage.i18nextLng || 'en';

  // If for some reason lang variable is not one of the available languages, change the language to en
  if (!languages.includes(lang)) {
    lang = 'en';
    i18n.changeLanguage('en');
  }

  const NotFoundRedirect = () => {
    const { pathname } = useLocation();

    // Comment: Redirects urls like /order/any to /en/order/any
    if (!languages.includes(pathname.split('/')[1])) return <Redirect to={`/${lang}${pathname}`} />;

    return <Redirect to={`/${lang}/not-found`} />;
  };

  return (
    <GraphCMSProvider>
      <Provider store={store}>
        <BreakpointProvider queries={defaultQuery}>
          <BrowserRouter>
            <Suspense fallback={<></>}>
              <ToTop>
                <Referrals />
                <Announcement />
                <Container>
                  <Header />

                  <Switch>
                    <Route exact path="/" render={props => <Redirect to={`/${lang}${props.location.search}`} />} />
                    <Route exact path="/:lang(en|de|ru)/terms-and-conditions" component={TermsConditions} />
                    <Route exact path="/:lang(en|de|ru)/privacy" component={Privacy} />
                    <Route exact path="/:lang(en|de|ru)/profile/:user?" component={Profile} />
                    <Route exact path="/:lang(en|de|ru)/order/:orderRef" component={Order} />
                    <Route exact path="/:lang(en|de|ru)/orders/:orderRef?" component={Orders} />
                    <Route exact path="/:lang(en|de|ru)" render={props => <Home {...props} store={store} />} />
                    <Route exact path="/:lang(en|de|ru)/instant-white-label/" component={WhiteLabelSEO} />
                    <Route exact path="/:lang(en|de|ru)/faqs/:id?" component={FAQ} />
                    <Route exact path="/:lang(en|de|ru)/about" component={About} />
                    <Route exact path="/:lang(en|de|ru)/signin" component={SignIn} />
                    <Route exact path="/:lang(en|de|ru)/signout" component={SignOut} />
                    <Route exact path="/:lang(en|de|ru)/signup" component={SignUp} />
                    <Route exact path="/:lang(en|de|ru)/forgot-password" component={ForgotPassword} />
                    <Route exact path="/:lang(en|de|ru)/convert/:quote-to-:base" render={props => <Pair {...props} store={store} />} />
                    <Route exact path="/:lang(en|de|ru)/not-found" component={NotFound} />
                    <Route component={NotFoundRedirect} />
                  </Switch>

                  <Footer />
                </Container>
                <Intercom />
              </ToTop>
            </Suspense>
          </BrowserRouter>
        </BreakpointProvider>
      </Provider>
    </GraphCMSProvider>
  );
};

export default App;
