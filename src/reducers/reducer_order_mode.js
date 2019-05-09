import { ORDER_MODE_CHANGE } from 'Actions/types';

const initialState = 'INSTANT';

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_MODE_CHANGE:
      return action.mode;
    default:
      return state;
  }
};
