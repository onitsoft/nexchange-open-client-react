import { SHOW_SUPPORT_MODAL } from 'Actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case SHOW_SUPPORT_MODAL:
      return action.payload;
    default:
      return state;
  }
};
