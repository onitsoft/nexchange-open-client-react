import React from 'react';
import { Route, Switch } from 'react-router-dom';


import RequestReset from './request'
import NewPassword from './reset'

const ForgotPassword = (props) => {
  return (
    <Switch>
      <Route path='/forgot-password' exact component={RequestReset} />
      <Route path='/forgot-password/:resetToken?' exact component={NewPassword} />
    </Switch>
  );
}

export default ForgotPassword
