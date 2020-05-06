import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
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

    const res = await axios.post("/user/create.php", formData, config);

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

    const res = await axios.post("/user/login.php", formData, config);

    if (res.data.user) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      console.log("user_id", res.data.user["user_id"]);
      loadUser(res.data.user["user_id"]);
    } else {
      dispatch({ type: LOGIN_FAIL, payload: res.data.Message });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Load User
  const loadUser = async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      console.log("id for param", id);
      const res = await axios.get("/user/getLoggedIn.php?user_id=" + id);

      dispatch({ type: USER_LOADED, payload: res.data });
      console.log("load user res ", res.data);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
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

    try {
      const res = await axios.put(
        "/user/update.php?user_id=" + id,
        formData,
        config
      );

      dispatch({ type: UPDATE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: UPDATE_FAILED });
    }
  };

  // Delete Account

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
