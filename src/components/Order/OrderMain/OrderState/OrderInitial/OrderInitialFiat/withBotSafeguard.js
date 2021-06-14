import React, { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import styled from '@emotion/styled';

import OrderFailed from '../../OrderFailure/OrderFailure';
import verifyRecaptchaV3IsHuman from '../../../../../../utils/recaptchaVerification';

const Spinner = styled.div`
  position: block;
  padding: 25px;
  margin: auto;
  width: 40%;
`;

const withBotSafeguard = (ComponentToSafeguard, actionName) => props => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isVerifiedHuman, setIsVerifiedAsHuman] = useState('');
  const [isVerificationInProgress, setIsVerificationInProgress] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const triggerBotValidation = () => {
    (async () => {
      setIsVerificationInProgress(true);

      const token = await executeRecaptcha(actionName);
      const isHuman = await verifyRecaptchaV3IsHuman(token);
      setIsVerifiedAsHuman(isHuman);

      setIsVerificationInProgress(false);
      if (isInitialLoading) setIsInitialLoading(false);
    })();
  };

  useEffect(() => {
    if (executeRecaptcha) triggerBotValidation();
  }, [executeRecaptcha]);

  if (isInitialLoading || isVerificationInProgress) {
    return (
      <Spinner>
        <img src="/img/spinner.gif" alt="" />
      </Spinner>
    );
  }
  if (isVerifiedHuman) {
    return <ComponentToSafeguard {...props} triggerBotValidation={triggerBotValidation} />;
  }
  return <OrderFailed title="error.notfound1" />;
};

export default withBotSafeguard;
