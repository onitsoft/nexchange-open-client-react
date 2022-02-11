import { isEmpty } from 'lodash';
import { getResidenceLocation } from '../restrictedCountires/residenceLocationStorage';

const isUserAuthenticated = () => {
  if (localStorage.full_token) {
    const tokenData = JSON.parse(localStorage.full_token);
    return !isEmpty(tokenData);
  }
  return false;
};

const isResidenceLocationMissing = username => {
  const residenceLocation = getResidenceLocation(username);
  return !residenceLocation;
};

export { isUserAuthenticated, isResidenceLocationMissing };
