import { ORDER_BOOK_DATA_FETCHED, ORDER_BOOK_VALUE_CHANGE } from 'Actions/types';

const initialState = {
    order_type: 'BUY',
    quantity: '',
    limit_rate: '',
    sellDepth: [],
    buyDepth: [],
    history: [],
    myOrders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_VALUE_CHANGE:
      return { ...action.orderBook };
    case ORDER_BOOK_DATA_FETCHED:
      return { ...action.orderBook };
    default:
      return state;
  }
};
