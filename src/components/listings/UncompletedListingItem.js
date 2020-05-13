import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UncompletedListingItem = ({ listing, showButton }) => {
  const {
    listingID,
    title,
    description,
    expectedDays,
    expectedWeeks,
    expectedMonths,
    expectedYears,
    userID,
  } = listing;

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
        {showButton && (
          <Link to={`/placebid/${listingID}`}>
            <button className="btn btn-primary buttonLink">Bid</button>
          </Link>
        )}
        <Link to={`/user/${userID}`}>
          <button className="btn btn-blue buttonLink">Contact</button>
        </Link>
      </div>
    </div>
  );
};
UncompletedListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
  showButton: PropTypes.bool.isRequired,
};
export default UncompletedListingItem;
