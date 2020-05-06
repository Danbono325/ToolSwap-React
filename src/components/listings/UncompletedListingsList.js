import React, { useContext } from "react";
import UncompletedListingItem from "./UncompletedListingItem";
import ListingContext from "../../context/listings/listingContext";

const UncompletedListingsList = () => {
  const listingContext = useContext(ListingContext);

  const { listings } = listingContext;

  return listings.map((listing) => (
    <UncompletedListingItem
      key={listing.listingID}
      listing={listing}
      showButton={true}
    />
  ));
};

export default UncompletedListingsList;
