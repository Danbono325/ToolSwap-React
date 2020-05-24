import React, { useEffect, useState, useContext } from "react";
import MyBidList from "../bids/MyBidList";
import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";
import BidContext from "../../context/bids/bidContext";

const MyBids = () => {
  const authContext = useContext(AuthContext);
  const bidContext = useContext(BidContext);
  const listingContext = useContext(ListingContext);

  const { isAuthenticated, loadUser } = authContext;
  const { getUsersBids, bids } = bidContext;
  const { getListing } = listingContext;

  const [listings, setListings] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    getUsersBids(localStorage.getItem("idUser"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    makeListings();
    // eslint-disable-next-line
  }, [bids]);

  const makeListings = () => {
    setListings([]);
    bids.forEach((bid, index) => {
      let promise = getListing(bid.listingID);
      promise.then((val) => {
        setListings((listings) => [...listings, val]);
      });
    });
  };

  return <MyBidList listings={listings} bids={bids} />;
};

export default MyBids;
