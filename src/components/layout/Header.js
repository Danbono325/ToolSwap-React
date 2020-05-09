import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/authContext";

import "./Header.css";
import Logo from "../../assets/Subtraction3.svg";

const Header = ({ name }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    //Clear Listings
  };

  const authLinks = (
    <Fragment>
      <li className="hello">Hello {user && user.firstname}</li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/MyListings">My Listings</Link>
      </li>
      <li>
        <Link to="/MyBids">My Bids</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="header">
      <div className="headerContainer">
        <img
          src={Logo}
          alt="IMG..."
          style={{ width: "80px", marginRight: "10px" }}
        />
        <h1 id="tit">{name}</h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Tool Swap",
};

export default Header;
