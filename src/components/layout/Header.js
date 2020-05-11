import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";
import BidContext from "../../context/bids/bidContext";

import "./Header.css";
import Logo from "../../assets/Subtraction3.svg";

const Header = ({ name }) => {
  const authContext = useContext(AuthContext);
  const listingContext = useContext(ListingContext);
  const bidContext = useContext(BidContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearListings } = listingContext;
  const { clearBids } = bidContext;

  const onLogout = () => {
    logout();
    //Clear Listings
    clearListings();
  };

  const authLinks = (
    <Fragment>
      <li className="hello">Hello {user && user.firstname}</li>
      <li>
        <Link to="/" onClick={() => clearListings()}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/MyListings" onClick={() => clearListings()}>
          My Listings
        </Link>
      </li>
      <li>
        <Link to="/MyBids" onClick={() => clearBids()}>
          My Bids
        </Link>
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
