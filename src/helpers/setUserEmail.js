import axios from 'axios';
import config from '../config';

export default (email, successCb, errorCb) => {
    axios({
        method: 'put',
        contentType : 'application/json',
        url: `${config.API_BASE_URL}/users/me/`,
        data: { email },
        headers: {'Authorization': 'Bearer ' + localStorage.token}
    })
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