import React, { useState, useEffect, useContext } from "react";
import "./listings.css";
import AuthContext from "../../context/auth/authContext";
import ListingContext from "../../context/listings/listingContext";

const ListingForm = () => {
  const authContext = useContext(AuthContext);
  const listingContext = useContext(ListingContext);

  const { user } = authContext;
  const { current, clearCurrent, updateListing, addListing } = listingContext;

  useEffect(() => {
    if (current != null) {
      setListing(current);
    } else {
      setListing({
        title: "",
        description: "",
        expectedDays: 0,
        expectedWeeks: 0,
        expectedMonths: 0,
        expectedYears: 0,
      });
    }
  }, [listingContext, current]);

  const [listing, setListing] = useState({
    title: "",
    description: "",
    expectedDays: 0,
    expectedWeeks: 0,
    expectedMonths: 0,
    expectedYears: 0,
  });

  const {
    title,
    description,
    expectedDays,
    expectedWeeks,
    expectedMonths,
    expectedYears,
  } = listing;

  const onChange = (e) =>
    setListing({ ...listing, [e.target.name]: e.target.value });

  const clearAll = (e) => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current == null) {
      addListing(listing, user.user_id);
    } else {
      updateListing(listing, user.user_id);
      clearCurrent();
    }
    setListing({
      title: "",
      description: "",
      expectedDays: 0,
      expectedWeeks: 0,
      expectedMonths: 0,
      expectedYears: 0,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit} id="listingForm">
        <h2>{current != null ? "Edit Contact" : "Add Contact"}</h2>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Title..."
          required
        />
        <textarea
          type="text"
          rows="8"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Description..."
          form="listingForm"
          required
        />
        <label htmlFor="days" className="timeLabels">
          Expected Days:
        </label>
        <input
          type="number"
          name="expectedDays"
          value={expectedDays}
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
          name="expectedWeeks"
          value={expectedWeeks}
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
          name="expectedMonths"
          value={expectedMonths}
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
          name="expectedYears"
          value={expectedYears}
          onChange={onChange}
          id="years"
          min="0"
          max="5"
        />
        <input
          className="submitButton"
          type="submit"
          name="addListing"
          value={current ? "Update Job" : "Add Job"}
        />
        {current && (
          <div>
            <button className="clearButton" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ListingForm;
