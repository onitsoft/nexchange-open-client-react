import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import RequestReset from './request';
import NewPassword from './reset';

const resetTokenCookie = Cookies.get('resetToken');

const ForgotPassword = (props) => {
	const resetToken = props.match.params.token || resetTokenCookie;

  if (resetToken) return <NewPassword resetToken={resetToken} />;

  return <RequestReset />;
};

export default ForgotPassword;
