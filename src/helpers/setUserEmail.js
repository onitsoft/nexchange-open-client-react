import axios from 'axios';
import config from '../config';

export default (email, successCb, errorCb) => {
    axios
        .put(`${config.API_BASE_URL}/users/me/`, { email })
        .then(response => {
            if (successCb) {
                successCb(response);
            }
        })
        .catch(error => {
            if (errorCb) {
                errorCb(error);
            }
        });
}