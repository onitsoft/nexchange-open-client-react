import { PAIRS_FETCHED } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case PAIRS_FETCHED:
      return action.payload;
    default:
      return state;
  }
};
