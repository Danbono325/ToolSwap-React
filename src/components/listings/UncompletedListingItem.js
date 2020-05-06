import React, { useEffect, useContext } from "react";
import ListingContext from "../../context/listings/listingContext";

const UncompletedListingItem = ({ listing }) => {
  const listingContext = useContext(ListingContext);

  const { getUncompletedListings } = listingContext;

  useEffect(() => {
    getUncompletedListings();
    // eslint-disable-next-line
  }, []);

  const {
    listingID,
    title,
    description,
    expectedDays,
    expectedWeeks,
    expectedMonths,
    expectedYears,
  } = listing;

  const onBid = () => {};

  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <span className="spanContainer">Expected Time for Completion: </span>
      {expectedYears > 0 && <span>{expectedYears} Years </span>}
      {expectedMonths > 0 && <span>{expectedMonths} Months </span>}
      {expectedWeeks > 0 && <span>{expectedWeeks} Weeks </span>}
      {expectedDays > 0 && <span>{expectedDays} Days </span>}
      <div className="buttonContainer">
        <button className="btn btn-primary" onClick={onBid}>
          Bid
        </button>
      </div>
    </div>
  );
};
export default UncompletedListingItem;
