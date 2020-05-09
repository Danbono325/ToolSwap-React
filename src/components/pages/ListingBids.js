import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import BidContext from "../../context/bids/bidContext";
import ListingContext from "../../context/listings/listingContext";
import MyListingsItem from "../listings/MyListingItem";
import BidList from "../bids/BidList";

const ListingBids = ({ match }) => {
  const authContext = useContext(AuthContext);
  const bidContext = useContext(BidContext);
  const listingContext = useContext(ListingContext);

  const { user, loadUser, isAuthenticated } = authContext;
  const { getListing, listing } = listingContext;
  const { getListingsBids, bids } = bidContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(user.user_id);
    } else {
      loadUser(0);
    }
    getListing(match.params.listing);
    getListingsBids(user.user_id, match.params.listing);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {listing && <MyListingsItem listing={listing} />}
      {bids && <BidList bids={bids} showButton={false} />}
    </div>
  );
};

export default ListingBids;
