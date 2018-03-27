import axios from 'axios';
import config from '../config';

export default (successCb, errorCb) => {
    axios({
        method: 'get',
        contentType : 'application/json',
        url: `${config.API_BASE_URL}/users/me/`,
        headers: {'Authorization': 'Bearer ' + localStorage.token}
    })
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
}