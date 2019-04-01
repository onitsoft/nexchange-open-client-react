import { ORDER_BOOK_ON, ORDER_BOOK_OFF } from 'Actions/types';

const initialState = {
  active: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_ON:
      return { ...action.payload, active: true };
    case ORDER_BOOK_OFF:
      return { ...action.payload, active: false };
    default:
      return state;
  }
};
