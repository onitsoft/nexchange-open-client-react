import axios from 'axios';
import config from 'Config';

export default () => {
  axios.interceptors.request.use(
    function(requestConfig) {
      if (requestConfig.url.indexOf('users/me') > -1 && requestConfig.method === 'get' && !localStorage.token) {
        return;
      } else {
        if (requestConfig.url.indexOf(config.API_BASE_URL) > -1 && localStorage.token) {
          const token = localStorage.token;
          requestConfig.headers['Authorization'] = `Bearer ${token}`;
        }

        if (!requestConfig.url.endsWith('/') && requestConfig.url.indexOf('?') === -1) {
          requestConfig.url += '/';
        }

        return requestConfig;
      }
    },
    function(error) {
      return Promise.reject(error);
    }
  );
};
