import { PRICE_FETCHED, FETCHING_PRICE } from 'Actions/types';

const initialState = {
  deposit: '...',
  receive: '...',
  lastEdited: 'deposit',
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRICE_FETCHED:
      return { ...action.payload, fetching: false };
    case FETCHING_PRICE:
      return { ...state, fetching: true };
    default:
      return state;
  }
};
