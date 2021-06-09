import axios from 'axios';

import config from '../config';

const { API_BASE_URL } = config;

const verifyRecaptchaV3IsHuman = async token =>
  axios
    .post(`${API_BASE_URL}/recaptcha/v3`, { response_token: token })
    .then(res => {
      const { success } = res.data;
      return success;
    })
    .catch(_ => false);

export default verifyRecaptchaV3IsHuman;
