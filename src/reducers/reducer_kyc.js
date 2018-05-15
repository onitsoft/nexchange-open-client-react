import { SET_KYC } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_KYC:
      return action.kyc;
    default:
      return state;
  }
};
