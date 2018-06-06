import { SET_ORDER } from 'Actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};
