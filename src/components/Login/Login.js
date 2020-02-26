import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <form>
        <h2>Login or Signup</h2>
        <input type="text" name="user" placeholder="Username..." />
        <input type="text" name="pass" placeholder="Password..." />
        <div className="options">
          <div className="remember">
            <input
              type="checkbox"
              //checked="checked"
              name="remember"
              id="remember-me"
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div>
          <a className="psw" href="#">
            Forgot password?
          </a>
        </div>
        <div className="buttons">
          <input type="submit" name="login" value="LOG IN" />
          <input
            type="submit"
            className="signinButton"
            name="signup"
            value="SIGN UP"
          />
        </div>
        {/* <a class="link" href="#">
          Dont have an account? Sign Up{" "}
        </a> */}
      </form>
    );
  }
}
export default Login;
