import { ORDER_BOOK_TOGGLE, ORDER_BOOK_FETCHED } from 'Actions/types';

const initialState = {
  active: true,
  orderBook: {
    asks: [],
    bids: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_TOGGLE:
      return { ...action.payload};
    case ORDER_BOOK_FETCHED:
      return { ...action.payload, orderBook: action.orderBook, active: true };
    default:
      return state;
  }
};
