import { ERROR_ALERT } from 'Actions/types';

const initialState = {
  show: false,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ALERT:
      return action.payload;
    default:
      return state;
  }
};
