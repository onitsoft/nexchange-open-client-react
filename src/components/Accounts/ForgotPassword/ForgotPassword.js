import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import RequestReset from './request';
import NewPassword from './reset';

const resetToken = Cookies.get('resetToken');

const ForgotPassword = () => {
  useEffect(() => {
    return () => {
      Cookies.remove('resetToken');
    };
  }, []);

  if (resetToken) return <NewPassword resetToken={resetToken} />;

  return <RequestReset />;
};

export default ForgotPassword;
