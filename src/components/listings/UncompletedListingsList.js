import React, { useContext, useEffect } from "react";
import UncompletedListingItem from "./UncompletedListingItem";
import ListingContext from "../../context/listings/listingContext";

const UncompletedListingsList = () => {
  const listingContext = useContext(ListingContext);

  const { listings, getUncompletedListings } = listingContext;

  useEffect(() => {
    getUncompletedListings();
    // eslint-disable-next-line
  }, []);

  return listings.map((listing) => (
    <UncompletedListingItem
      key={listing.listingID}
      listing={listing}
      showButton={true}
    />
  ));
};

export default UncompletedListingsList;
