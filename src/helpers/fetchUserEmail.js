import axios from 'axios';
import config from '../config';

export default (successCb, errorCb) => {
  axios
    .get(`${config.API_BASE_URL}/users/me/`)
    .then(response => {
      if (successCb) {
        successCb(response.data.email);
      }
    })
    .catch(error => {
      if (errorCb) {
        errorCb(error);
      }
    });
};
