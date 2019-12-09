import {
  AUTH_TOKEN_RECEIVED,
  AUTH_USER_PROFILE,
  AUTH_LOADING,
  AUTH_COMPLETE,
  AUTH_FAILED,
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_PASSWORD_RESET,
  AUTH_PASSWORD_RESET_SUCCESS,
  AUTH_PASSWORD_RESET_FAILED,
  AUTH_USER_REGISTERED,
  AUTH_REGISTRATION_COMPLETE,
  AUTH_REGISTRATION_FAILED,
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
    case AUTH_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        reset: action.payload
      }
    case AUTH_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        reset: action.payload,
        passwordReset: true
      }
    case AUTH_PASSWORD_RESET_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case AUTH_SIGN_UP:
      return {
        ...state,
        loading: true,
        signup: action.payload
      }
    case AUTH_USER_REGISTERED:
      return {
        ...state,
        loading: false,
        registered: action.payload
      }
    case AUTH_REGISTRATION_COMPLETE:
      return {
        ...state,
        signup: null,
        loading: false,
        complete: true
      }
    case AUTH_REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
        signup: {
          ...state.signup,
          error: action.payload
        }
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
        },
        loggedIn: true
      }
    default:
      return state;
  }
};
