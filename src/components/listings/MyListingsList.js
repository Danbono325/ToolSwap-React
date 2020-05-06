import React, { useContext } from "react";
import MyListingItem from "./MyListingItem";
import ListingContext from "../../context/listings/listingContext";

const MyListingsList = () => {
  const listingContext = useContext(ListingContext);

  const { listings } = listingContext;

  return listings.map((listing) => (
    <MyListingItem key={listing.listingID} listing={listing} />
  ));
};

export default MyListingsList;
