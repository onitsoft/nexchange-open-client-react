import axios from 'axios';
import config from '../config';

export default (email, successCb, errorCb) => {
  axios
    .put(`${config.API_BASE_URL}/users/me/`, { email })
    .then(response => {
      if (!window.$crisp.get('user:email')) {
        window.$crisp.push(['set', 'user:email', [email]]);
      }

      if (successCb) {
        successCb(response);
      }
    })
    .catch(error => {
      if (errorCb) {
        errorCb(error);
      }
    });
};
