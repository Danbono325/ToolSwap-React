import React, { useContext, useEffect } from "react";
import ListingForm from "../listings/ListingForm";
import MyListingsList from "../listings/MyListingsList";

import AuthContext from "../../context/auth/authContext";

const MyListings = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, user, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(user.user_id);
    } else {
      loadUser(0);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="column left">
        <ListingForm />
      </div>
      <div className="column right">
        <MyListingsList />
      </div>
    </div>
  );
};

export default MyListings;
