import { PRICE_FETCHED, FETCHING_PRICE } from 'Actions/types';

const initialState = {
  deposit: '...',
  receive: '...',
  min_amount_quote: '...',
  max_amount_quote: '...',
  min_amount_base: '...',
  max_amount_base: '...',
  fetching: true,
  lastEdited: 'deposit',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PRICE:
      return {
        ...state,
        deposit: '...',
        receive: '...',
        min: '...',
        max: '...',
        fetching: true,
      };
    case PRICE_FETCHED:
      return { ...action.payload, fetching: false };
    default:
      return state;
  }
};
