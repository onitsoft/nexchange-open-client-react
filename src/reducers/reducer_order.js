import { SET_ORDER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};
