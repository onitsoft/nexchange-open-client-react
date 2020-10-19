import { SET_WALLET, SET_WALLET_SUCCESS, SHOW_WALLET_ADDRESS_MODAL, FORCE_WALLET_ADDRESS_MODAL, RESET_WALLET } from 'Actions/types';

const initialState = {
  userAddress: {},
  valid: false,
  show: false,
  forced: false,
  success: false,
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
    case SET_WALLET_SUCCESS:
      return {
        ...state,
        success: action.payload,
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
    case RESET_WALLET:
      return initialState;
    default:
      return state;
  }
};
