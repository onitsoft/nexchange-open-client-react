import React from 'react';
import Cookies from 'js-cookie';

import RequestReset from './request';
import NewPassword from './reset';

const resetToken = Cookies.get('resetToken');

const ForgotPassword = () => {
  if (resetToken) return <NewPassword resetToken={resetToken} />;

  return <RequestReset />;
};

export default ForgotPassword;
