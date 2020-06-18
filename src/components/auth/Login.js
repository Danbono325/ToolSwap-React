import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import "./Login.css";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, isAuthenticated, error, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields.", "warning");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login or Register</h2>
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email..."
        required
      />
      <input
        type="text"
        name="password"
        type="password"
        value={password}
        onChange={onChange}
        placeholder="Password..."
        required
      />
      {/* <div className="options">
        <div className="remember">
          <input type="checkbox" name="remember" id="remember-me" />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <a className="psw" href="#">
          Forgot password?
        </a>
      </div> */}
      <div className="buttons">
        <input type="submit" name="login" value="Login" />
        <Link to="/register">
          <button className="registerButton">Register</button>
        </Link>
      </div>
    </form>
  );
};
export default Login;
