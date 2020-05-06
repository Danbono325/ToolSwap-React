import React, { useEffect, useContext } from "react";
import UncompletedListingsList from "../listings/UncompletedListingsList";
import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const listingContext = useContext(ListingContext);

  const { isAuthenticated, user, loadUser } = authContext;

  const { getUncompletedListings } = listingContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(user.user_id);
      getUncompletedListings();
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
