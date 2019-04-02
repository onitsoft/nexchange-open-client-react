import { ORDER_BOOK_ON, ORDER_BOOK_OFF, ORDER_BOOK_FETCHED } from 'Actions/types';

const initialState = {
  active: true,
  orderBook: {
    asks: [],
    bids: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_ON:
      return { ...action.payload, active: true };
    case ORDER_BOOK_OFF:
      return { ...action.payload, active: false };
    case ORDER_BOOK_FETCHED:
      return { ...action.payload, orderBook: action.orderBook, active: true };
    default:
      return state;
  }
};
