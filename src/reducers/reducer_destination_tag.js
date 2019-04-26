import { SET_DESTINATION_TAG } from 'Actions/types';

const initialState = {
  destinationTag: '',
  valid: false,
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DESTINATION_TAG:
      return action.payload;
    default:
      return state;
  }
};
