import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import BidContext from "../../context/bids/bidContext";

const BidItem = ({ bid, showButtons }) => {
  const authContext = useContext(AuthContext);
  const bidContext = useContext(BidContext);

  const { user } = authContext;
  const { deleteBid, setCurrent, clearCurrent } = bidContext;

  const {
    bidID,
    amount,
    estimatedTimeDays,
    estimatedTimeWeeks,
    estimatedTimeMonths,
    estimatedTimeYears,
    message,
    userID,
  } = bid;

  const onDelete = (e) => {
    e.preventDefault();
    deleteBid(user.user_id, bidID);
    clearCurrent();
  };

  return (
    <div className="card card-edit">
      <p className="title">${amount}</p>
      <p className="description">Message: {message}</p>
      <span className="spanContainer">Estimated Time for Completion: </span>
      {estimatedTimeYears > 0 && <span>{estimatedTimeYears} Years </span>}
      {estimatedTimeMonths > 0 && <span>{estimatedTimeMonths} Months </span>}
      {estimatedTimeWeeks > 0 && <span>{estimatedTimeWeeks} Weeks </span>}
      {estimatedTimeDays > 0 && <span>{estimatedTimeDays} Days </span>}
      {showButtons ? (
        <div className="buttonContainer">
          <button className="btn btn-secondary" onClick={() => setCurrent(bid)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div className="buttonContainer">
          <Link to={`/user/${userID}`}>
            <button className="btn btn-blue buttonLink">Contact</button>
          </Link>
        </div>
      )}
    </div>
  );
};

BidItem.propTypes = {
  bid: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

export default BidItem;
