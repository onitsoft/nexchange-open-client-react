import axios from 'axios';
import config from '../config';

export default () => {
  axios.interceptors.request.use(
    function(requestConfig) {
      // Setting authorization header for /kyc endpoint for some
      // reason breaks it.
      if (
        requestConfig.url.indexOf(config.API_BASE_URL) > -1 &&
        localStorage.token
      ) {
        const token = localStorage.token;
        requestConfig.headers['Authorization'] = `Bearer ${token}`;
      }

      return requestConfig;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
};
