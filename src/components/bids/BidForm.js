import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import BidContext from "../../context/bids/bidContext";
import AlertContext from "../../context/alert/alertContext";

const BidForm = ({ listing, edit }) => {
  const authContext = useContext(AuthContext);
  const bidContext = useContext(BidContext);
  const alertContext = useContext(AlertContext);

  const { user } = authContext;
  const {
    current,
    createBid,
    updateBid,
    clearCurrent,
    returnMessage,
    error,
  } = bidContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current != null) {
      setBid(current);
    } else {
      setBid({
        amount: "",
        message: "",
        estimatedTimeDays: 0,
        estimatedTimeWeeks: 0,
        estimatedTimeMonths: 0,
        estimatedTimeYears: 0,
      });
    }
    // eslint-disable-next-line
  }, [bidContext, current]);

  useEffect(() => {
    if (returnMessage) {
      setAlert(returnMessage, "success");
    } else if (error) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [returnMessage, error]);

  const [bid, setBid] = useState({
    amount: "",
    message: "",
    estimatedTimeDays: 0,
    estimatedTimeWeeks: 0,
    estimatedTimeMonths: 0,
    estimatedTimeYears: 0,
  });

  const {
    amount,
    message,
    estimatedTimeDays,
    estimatedTimeWeeks,
    estimatedTimeMonths,
    estimatedTimeYears,
  } = bid;

  const onChange = (e) => setBid({ ...bid, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      estimatedTimeDays === 0 &&
      estimatedTimeWeeks === 0 &&
      estimatedTimeMonths === 0 &&
      estimatedTimeYears === 0
    ) {
      setAlert(
        "You must have a minimum of one day for estimated time.",
        "warning"
      );
    } else if (!edit) {
      createBid(bid, user.user_id, listing.listingID);
      setBid({
        amount: "",
        message: "",
        estimatedTimeDays: 0,
        estimatedTimeWeeks: 0,
        estimatedTimeMonths: 0,
        estimatedTimeYears: 0,
      });
    } else {
      updateBid(bid, user.user_id);
      clearCurrent();
      setBid({
        amount: "",
        message: "",
        estimatedTimeDays: 0,
        estimatedTimeWeeks: 0,
        estimatedTimeMonths: 0,
        estimatedTimeYears: 0,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} id="bidForm">
        <h2>{edit ? "Edit Bid" : "Add Bid"}</h2>
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={onChange}
          placeholder="Estimated amount..."
          required
        />
        <label htmlFor="days" className="timeLabels">
          Estimated Days:
        </label>
        <input
          type="number"
          name="estimatedTimeDays"
          value={estimatedTimeDays}
          onChange={onChange}
          id="days"
          min="0"
          max="6"
        />
        <label className="timeLabels" htmlFor="weeks">
          Expected Weeks:
        </label>
        <input
          type="number"
          name="estimatedTimeWeeks"
          value={estimatedTimeWeeks}
          onChange={onChange}
          id="weeks"
          min="0"
          max="3"
        />
        <label className="timeLabels" htmlFor="months">
          Expected Months:
        </label>
        <input
          type="number"
          name="estimatedTimeMonths"
          value={estimatedTimeMonths}
          onChange={onChange}
          id="months"
          min="0"
          max="11"
        />
        <label className="timeLabels" htmlFor="years">
          Expected Years:
        </label>
        <input
          type="number"
          name="estimatedTimeYears"
          value={estimatedTimeYears}
          onChange={onChange}
          id="years"
          min="0"
          max="5"
        />
        <textarea
          type="text"
          rows="8"
          name="message"
          value={message}
          onChange={onChange}
          placeholder="Message..."
          form="bidForm"
          required
        />
        <input
          className="submitButton"
          type="submit"
          name="addBid"
          value={edit ? "Edit Bid" : "Add Bid"}
        />
      </form>
    </div>
  );
};
BidForm.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default BidForm;
