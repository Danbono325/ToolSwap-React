import React, { useEffect, useContext } from "react";
import UncompletedListingsList from "../listings/UncompletedListingsList";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { loadUser, isAuthenticated, returnMessage, error } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (returnMessage) {
      setAlert(returnMessage, "success");
    } else if (error) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [returnMessage, error]);

  return (
    <div>
      <UncompletedListingsList />
    </div>
  );
};

export default Home;
