import { SET_PAYMENT_ID } from 'Actions/types';

const initialState = {
  paymentId: '',
  valid: false,
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_ID:
      return action.payload;
    default:
      return state;
  }
};
