import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";

const MyListingItem = ({ listing, showButtons }) => {
  const authContext = useContext(AuthContext);
  const listingContext = useContext(ListingContext);

  const { user } = authContext;

  const { setCurrent, deleteListing, clearCurrent } = listingContext;

  const {
    listingID,
    title,
    description,
    expectedDays,
    expectedWeeks,
    expectedMonths,
    expectedYears,
  } = listing;

  const onCompleted = () => {};

  const onDelete = () => {
    deleteListing(user.user_id, listingID);
    clearCurrent();
  };

  return (
    <div className="card card-edit">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <span className="spanContainer">Expected Time for Completion: </span>
      {expectedYears > 0 && <span>{expectedYears} Years </span>}
      {expectedMonths > 0 && <span>{expectedMonths} Months </span>}
      {expectedWeeks > 0 && <span>{expectedWeeks} Weeks </span>}
      {expectedDays > 0 && <span>{expectedDays} Days </span>}
      {showButtons && (
        <div className="buttonContainer">
          <button className="btn btn-primary" onClick={onCompleted}>
            Completed
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrent(listing)}
          >
            Edit
          </button>
          <Link to={`/listingbids/${listingID}`}>
            <button className="buttonLink btn btn-blue">Bids</button>
          </Link>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

MyListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default MyListingItem;
