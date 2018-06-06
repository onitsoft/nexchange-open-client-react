import { SET_WALLET } from 'Actions/types';

const initialState = {
  address: '',
  valid: false,
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET:
      return action.payload;
    default:
      return state;
  }
};
