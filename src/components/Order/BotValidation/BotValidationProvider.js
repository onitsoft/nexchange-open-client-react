import React, { createContext, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from '@emotion/styled';

import OrderFailed from '../OrderMain/OrderState/OrderFailure/OrderFailure';
import OrderLoading from "../OrderLoading/OrderLoading";
import { verifyRecaptchaV3IsHuman, verifyRecaptchaV2IsHuman } from './recaptchaVerification';

const RecaptchaV2Container = styled.div`
  width: 30%;
  margin: auto;
  padding: 5rem 0.5rem;
`;

export const BotValidationContext = createContext({});

const BotValidationProvider = ({ children, recaptchaV2SiteKey, orderId, initialActionName = 'initializing_bot_provider' }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // region States
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [isVerifiedHuman, setIsVerifiedAsHuman] = useState(false);
  const [isVerificationInProgress, setIsVerificationInProgress] = useState(false);
  const [isAdditionalValidationNeeded, setIsAdditionalValidationNeeded] = useState(false);

  const [hookTriggerOnSuccess, setHookTriggerOnSuccess] = useState(0);
  const [hookTriggerOnFailure, setHookTriggerOnFailure] = useState(0);
  // endregion

  // region Trigger functions
  const tickHookTriggerValidationOnSuccess = () => setHookTriggerOnSuccess(hookTriggerOnSuccess + 1);

  const tickHookTriggerOnValidationFailure = () => setHookTriggerOnFailure(hookTriggerOnFailure + 1);
  // endregion

  const wrapWithAsyncLoadingState = validationLambdaFn => {
    (async () => {
      setIsVerificationInProgress(true);
      await validationLambdaFn();
      setIsVerificationInProgress(false);
    })();
  };

  // region Seamless Validation
  const verifyWithGoogleRecaptchaV3 = async actionName => {
    const tokenV3 = await executeRecaptcha(actionName);
    return verifyRecaptchaV3IsHuman(tokenV3, orderId);
  };

  const validateSeamlessly = (actionName = 'unkown_action') => {
    wrapWithAsyncLoadingState(async () => {
      const isHuman = await verifyWithGoogleRecaptchaV3(actionName);

      if (isHuman) {
        setIsVerifiedAsHuman(isHuman);
        tickHookTriggerValidationOnSuccess();
      } else {
        // Enable validation with interaction
        setIsAdditionalValidationNeeded(true);
      }
    });
  };
  // endregion

  // region Validation With User Interaction
  const verifyWithGoogleRecaptchaV2 = async tokenV2 => verifyRecaptchaV2IsHuman(tokenV2, orderId);

  const validateWithUserInteraction = token => {
    wrapWithAsyncLoadingState(async () => {
      const isHuman = await verifyWithGoogleRecaptchaV2(token);
      setIsVerifiedAsHuman(isHuman);
      setIsAdditionalValidationNeeded(false);

      if (isHuman) {
        tickHookTriggerValidationOnSuccess();
      } else {
        tickHookTriggerOnValidationFailure();
      }
    });
  };
  // endregion

  useEffect(() => {
    if (executeRecaptcha) {
      validateSeamlessly(initialActionName);
      if (isInitialLoading) {
        setIsInitialLoading(false);
      }
    }
  }, [executeRecaptcha]);

  // region Rendering

  if (isInitialLoading || isVerificationInProgress) {
    return <OrderLoading />;
  }

  if (isAdditionalValidationNeeded) {
    return (
      <RecaptchaV2Container>
        <ReCAPTCHA sitekey={recaptchaV2SiteKey} onChange={validateWithUserInteraction} />
      </RecaptchaV2Container>
    );
  }

  if (isVerifiedHuman) {
    return (
      <>
        <BotValidationContext.Provider
          value={{
            verifyIfHuman: validateSeamlessly,
            isVerifiedHuman,

            hookTriggerOnSuccess,
            hookTriggerOnFailure,

            isInitialLoading,
            isVerificationInProgress,
          }}
        >
          {children}
        </BotValidationContext.Provider>
      </>
    );
  }

  return <OrderFailed title="error.notfound1" />;

  // endregion
};

export default BotValidationProvider;
