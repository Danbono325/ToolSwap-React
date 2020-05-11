import React, { useContext, useEffect } from "react";
import MyListingItem from "./MyListingItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import ListingContext from "../../context/listings/listingContext";

const MyListingsList = ({ showButtons }) => {
  const listingContext = useContext(ListingContext);

  const { getUsersListings, listings, loading } = listingContext;

  useEffect(() => {
    getUsersListings(localStorage.getItem("idUser"));
    // eslint-disable-next-line
  }, []);

  return listings !== null && !loading ? (
    listings.map((listing) => (
      <MyListingItem
        key={listing.listingID}
        listing={listing}
        showButtons={showButtons}
      />
    ))
  ) : (
    <Spinner />
  );
};
MyListingsList.propTypes = {
  showButtons: PropTypes.bool.isRequired,
};
export default MyListingsList;
