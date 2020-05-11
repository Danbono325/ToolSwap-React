import React, { useContext, useEffect } from "react";
import UncompletedListingItem from "./UncompletedListingItem";
import Spinner from "../layout/Spinner";
import ListingContext from "../../context/listings/listingContext";

const UncompletedListingsList = () => {
  const listingContext = useContext(ListingContext);

  const { listings, getUncompletedListings, loading } = listingContext;

  useEffect(() => {
    getUncompletedListings();
    // eslint-disable-next-line
  }, []);

  return listings !== null && !loading ? (
    listings.map((listing) => (
      <UncompletedListingItem
        key={listing.listingID}
        listing={listing}
        showButton={true}
      />
    ))
  ) : (
    <Spinner />
  );
};

export default UncompletedListingsList;
