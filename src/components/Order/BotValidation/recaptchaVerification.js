import axios from 'axios';

import config from '../../../config';

const { API_BASE_URL } = config;

export const verifyRecaptchaV3IsHuman = async token =>
  axios
    .post(`${API_BASE_URL}/recaptcha/v3`, { response_token: token })
    .then(res => {
      const { challenge_passed } = res.data;
      return challenge_passed;
    })
    .catch(_ => false);

export const verifyRecaptchaV2IsHuman = async token =>
  axios
    .post(`${API_BASE_URL}/recaptcha/v2`, { response_token: token })
    .then(res => {
      const { challenge_passed } = res.data;
      return challenge_passed;
    })
    .catch(_ => false);
