import { SET_MEMO } from 'Actions/types';

const initialState = {
  memo: '',
  valid: false,
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMO:
      return action.payload;
    default:
      return state;
  }
};
