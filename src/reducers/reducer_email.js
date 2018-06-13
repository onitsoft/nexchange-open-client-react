import { SET_EMAIL, SET_EMAIL_AND_MESSAGE } from 'Actions/types';

const initialState = {
  value: '',
  message: {
    text: '',
    error: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, value: action.value, message: action.message };
    case SET_EMAIL_AND_MESSAGE:
      return { ...state, value: action.value, message: action.message };
    default:
      return state;
  }
};
