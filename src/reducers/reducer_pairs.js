import { PAIRS_FETCHED } from 'Actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case PAIRS_FETCHED:
      return action.payload;
    default:
      return state;
  }
};
