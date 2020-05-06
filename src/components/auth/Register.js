import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import "./Login.css";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstname, lastname, username, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else if (error) {
      setAlert(error, "danger");
    } else {
      register({
        firstname,
        lastname,
        username,
        email,
        password,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="firstname"
        value={firstname}
        onChange={onChange}
        placeholder="First Name..."
        required
      />
      <input
        type="text"
        name="lastname"
        value={lastname}
        onChange={onChange}
        placeholder="Last Name..."
        required
      />
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username..."
        required
      />
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
        value={password}
        onChange={onChange}
        placeholder="Password..."
        required
      />
      <input
        type="text"
        name="password2"
        value={password2}
        onChange={onChange}
        placeholder="Confirm Password..."
        required
      />
      <div className="buttons">
        <input
          type="submit"
          className="registerButton register"
          name="signup"
          value="REGISTER"
        />
      </div>
    </form>
  );
};

export default Register;
