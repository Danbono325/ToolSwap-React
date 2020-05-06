import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Home from "./components/pages/Home";
import MyListings from "./components/pages/MyListings";
import Account from "./components/pages/Account";
import Alerts from "./components/layout/Alerts";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ListingState from "./context/listings/ListingState";

import PrivateRoute from "./components/routing/PrivateRoute";

import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ListingState>
        <AlertState>
          <Router>
            <Header name="ToolSwap" />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/account" component={Account} />
                <PrivateRoute exact path="/MyListings" component={MyListings} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ListingState>
    </AuthState>
  );
};

export default App;
