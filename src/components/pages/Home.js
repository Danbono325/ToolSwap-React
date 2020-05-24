import React, { useEffect, useContext } from "react";
import UncompletedListingsList from "../listings/UncompletedListingsList";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UncompletedListingsList />
    </div>
  );
};

export default Home;
