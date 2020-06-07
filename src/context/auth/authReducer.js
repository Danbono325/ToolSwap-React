import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  GET_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_USER,
  USER_UPDATE,
  USER_ERROR,
  RESET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data[0],
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.jwt);
      localStorage.setItem("idUser", action.payload.user.user_id);
      localStorage.setItem("isAuthenticated", "true");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        returnMessage: action.payload.Message,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("idUser");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        users: null,
        user: {},
        error: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user_: action.payload,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.jwt,
        returnMessage: action.payload.Message,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USER:
      return {
        ...state,
        user_: {},
        returnMessage: null,
        error: null,
      };
    default:
      return state;
  }
};
