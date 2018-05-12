import { COINS_INFO } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case COINS_INFO:
      return action.payload;
    default:
      return state;
  }
};
