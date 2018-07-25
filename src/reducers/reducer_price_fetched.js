import { PRICE_FETCHED, FETCHING_PRICE } from 'Actions/types';

const initialState = {
  deposit: '...',
  receive: '...',
  fetching: true,
  lastEdited: 'deposit',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PRICE:
      return { ...state, fetching: true };
    case PRICE_FETCHED:
      return { ...action.payload, fetching: false };
    default:
      return state;
  }
};
