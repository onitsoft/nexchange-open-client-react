import {
  AUTH_TOKEN_RECEIVED,
  AUTH_USER_PROFILE,
  AUTH_LOADING,
  AUTH_COMPLETE,
  AUTH_FAILED,
  AUTH_SIGN_OUT,
  AUTH_LOAD_ORDERS
} from 'Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    case AUTH_COMPLETE:
      return {
        ...state,
        loading: false,
        error: null
      }
      case AUTH_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case AUTH_SIGN_OUT:
        return {
          loading: false
        }
      case AUTH_LOAD_ORDERS:
        return {
          ...state,
          loading: false,
          profile: {
            ...(state.profile || {}),
            orders: action.payload
          }
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
