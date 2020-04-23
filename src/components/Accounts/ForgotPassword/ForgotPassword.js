import React from 'react';
import { Route, Switch } from 'react-router-dom';


import RequestReset from './request'
import NewPassword from './reset'

const ForgotPassword = (props) => {
  return (
    <Switch>
      <Route path='/:lang(en|de|ru)/forgot-password' exact component={RequestReset} />
      <Route path='/:lang(en|de|ru)/forgot-password/:resetToken?' exact component={NewPassword} />
    </Switch>
  );
}

export default ForgotPassword
