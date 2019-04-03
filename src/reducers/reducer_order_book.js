import { ORDER_BOOK_DATA_FETCHED } from 'Actions/types';

const initialState = {
    sellDepth: [],
    buyDepth: [],
    history: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_DATA_FETCHED:
      return { ...action.orderBook };
    default:
      return state;
  }
};
