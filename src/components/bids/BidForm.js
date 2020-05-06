import React, { useState } from "react";

const BidForm = () => {
  const [bid, setBid] = useState({
    amount: "",
    message: "",
    estimatedDays: 0,
    estimatedWeeks: 0,
    estimatedMonths: 0,
    estimatedYears: 0,
  });

  const {
    amount,
    message,
    estimatedDays,
    estimatedWeeks,
    estimatedMonths,
    estimatedYears,
  } = bid;

  const onChange = (e) => setBid({ ...bid, [e.target.name]: e.target.value });

  const onSubmit = () => {};

  return (
    <div>
      <form onSubmit={onSubmit} id="listingForm">
        <h2>Add Bid</h2>
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
          name="estimatedDays"
          value={estimatedDays}
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
          name="estimatedWeeks"
          value={estimatedWeeks}
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
          name="estimatedMonths"
          value={estimatedMonths}
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
          name="estimatedYears"
          value={estimatedYears}
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
          placeholder="Description..."
          form="listingForm"
          required
        />
        <input
          className="submitButton"
          type="submit"
          name="addBid"
          value="Add Bid"
        />
      </form>
    </div>
  );
};

export default BidForm;
