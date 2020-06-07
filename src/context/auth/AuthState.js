import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    loading: true,
    user: null,
    user_: {},
    returnMessage: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/user/create.php`, formData, config);

    if (res.data.user) {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser(res.data.user["user_id"]);
    } else {
      console.log("res", res.data);
      dispatch({ type: REGISTER_FAIL, payload: res.data.Message });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/user/login.php`, formData, config);

    if (res.data.user) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser(res.data.user["user_id"]);
      return true;
    } else {
      dispatch({ type: LOGIN_FAIL, payload: res.data.Message });
      return false;
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Load User
  const loadUser = async (id) => {
    resetLoading();

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`/user/getLoggedIn.php?user_id=${id}`);

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const getUser = async (user_id) => {
    const res = await axios.get(`/user/read.php?user_id=${user_id}`);
    dispatch({ type: GET_USER, payload: res.data.data[0] });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Edit Account
  const updateUser = async (formData, id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/user/update.php?user_id=${id}`,
      formData,
      config
    );
    if (res.data.Message === "User Updated") {
      dispatch({ type: USER_UPDATE, payload: res.data });
    } else {
      dispatch({ type: USER_ERROR, payload: res.data.Message });
    }
  };

  // Delete Account

  const resetLoading = () => dispatch({ type: RESET_LOADING });

  const clearUser = () => dispatch({ type: CLEAR_USER });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        user_: state.user_,
        returnMessage: state.returnMessage,
        error: state.error,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
        clearUser,
        getUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
