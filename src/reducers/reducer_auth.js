import { AUTH_TOKEN_RECEIVED, AUTH_USER_PROFILE } from 'Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    case AUTH_TOKEN_RECEIVED:
      return {
        ...state,
        token: {
          ...action.payload
        }
      }
    default:
      return state;
  }
};
