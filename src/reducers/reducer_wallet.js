import { SET_WALLET, SHOW_WALLET_ADDRESS_MODAL, FORCE_WALLET_ADDRESS_MODAL } from 'Actions/types';

const initialState = {
  userAddress: {
    address: '',
  },
  valid: false,
  show: false,
  forced: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        userAddress: {
          ...action.payload,
        },
      };
    case SHOW_WALLET_ADDRESS_MODAL:
      return {
        ...state,
        show: action.payload,
      };
    case FORCE_WALLET_ADDRESS_MODAL:
      return {
        ...state,
        forced: action.payload,
      };
    default:
      return state;
  }
};
