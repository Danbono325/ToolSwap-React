import React, { useContext, useEffect } from "react";
import BidForm from "../bids/BidForm";
import UncompletedListingItem from "../listings/UncompletedListingItem";
import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";

const PlaceBid = ({ match }) => {
  const authContext = useContext(AuthContext);
  const listingContext = useContext(ListingContext);

  const { isAuthenticated, loadUser } = authContext;
  const { getListing, listing } = listingContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    getListing(match.params.listing);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="column left">
        <BidForm listing={listing} edit={false} />
      </div>
      <div className="column right">
        {listing && (
          <UncompletedListingItem listing={listing} showButton={false} />
        )}
      </div>
    </div>
  );
};

export default PlaceBid;
