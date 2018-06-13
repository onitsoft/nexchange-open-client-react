import { SET_KYC } from 'Actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_KYC:
      return action.kyc;
    default:
      return state;
  }
};
