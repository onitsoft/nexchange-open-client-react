import { PRICE_FETCHED } from 'Actions/types';

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
    default:
      return state;
  }
};
