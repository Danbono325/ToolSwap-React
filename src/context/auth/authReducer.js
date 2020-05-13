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
  UPDATE_SUCCESS,
  UPDATE_FAILED,
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
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
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
        user: null,
        user: {},
        error: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user_: action.payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_FAILED:
      return {
        ...state,
        error: "Failed to update profile.",
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
    default:
      return state;
  }
};
