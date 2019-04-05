import { ORDER_BOOK_DATA_FETCHED, ORDER_BOOK_ORDER_TYPE_CHANGE } from 'Actions/types';

const initialState = {
    order_type: 'BUY',
    sellDepth: [],
    buyDepth: [],
    history: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_ORDER_TYPE_CHANGE:
      return { ...action.orderBook };
    case ORDER_BOOK_DATA_FETCHED:
      return { ...action.orderBook };
    default:
      return state;
  }
};
