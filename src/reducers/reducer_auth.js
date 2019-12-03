
export default (state = {}, action) => {
  switch (action.type) {
    case 'auth.token_received':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
};
