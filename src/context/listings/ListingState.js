import React, { useReducer } from "react";
import axios from "axios";
import ListingContext from "./listingContext";
import ListingReducer from "./listingReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  ADD_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
  GET_LISTINGS,
  GET_LISTING,
  UPDATE_ASCOMPLETED,
  SET_CURRENT,
  CLEAR_CURRENT,
  LISTING_ERROR,
} from "../types";

const ListingState = (props) => {
  const initialState = {
    listings: [],
    listing: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ListingReducer, initialState);

  // GET LISTING DETAILS
  const getListing = async (id) => {
    try {
      const res = await axios.get(`/listing/readListing.php?listing_id=${id}`);

      dispatch({ type: GET_LISTING, payload: res.data["data"][0] });
    } catch (err) {
      dispatch({ type: LISTING_ERROR, payload: err.response.Message });
    }
  };

  // ADD LISTING
  const addListing = async (listing, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `/listing/create.php?user_id=${id}`,
        listing,
        config
      );

      dispatch({ type: ADD_LISTING, payload: res.data });
    } catch (err) {
      dispatch({ type: LISTING_ERROR, payload: err.Message });
    }
    getUsersListings(id);
  };

  // EDIT/UPDATE LITING
  const updateListing = async (listing, user_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // UPDATE ON BACKEND
      await axios.put(
        `/listing/update.php?user_id=
          ${user_id}
          &listing_id=
          ${listing.listingID}`,
        listing,
        config
      );
      dispatch({ type: UPDATE_LISTING, payload: listing });
    } catch (err) {
      dispatch({ type: LISTING_ERROR, payload: err.Message });
    }
  };

  // SET CURRENT
  const setCurrent = (listing) => {
    dispatch({ type: SET_CURRENT, payload: listing });
  };

  // CLEAR FORM
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // GET USER'S LISTINGS
  const getUsersListings = async (id) => {
    // Get All Users Listings from backend (id)
    const res = await axios.get(`/listing/readUsersListings.php?user_id=${id}`);

    //Alter Dispatch
    dispatch({ type: GET_LISTINGS, payload: res.data["data"] });
  };

  // DELETE LISTING
  const deleteListing = async (iduser, id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // DELETE ON BACKEND
      await axios.delete(
        `/listing/delete.php?user_id=${iduser}&listing_id=${id}`
      );

      dispatch({ type: DELETE_LISTING, payload: id });
    } catch (err) {
      dispatch({ type: LISTING_ERROR, payload: err.response.Message });
    }
  };

  // GET ALL UNCOMPLETED LISTINGS
  const getUncompletedListings = async () => {
    // Get all Uncompleted Listings for Home page
    const res = await axios.get(`/listing/readUncompleted.php`);

    dispatch({ type: GET_LISTINGS, payload: res.data["data"] });
  };

  // UPDATE LISTING AS COMPLETED
  // UPDATE LISTING AS SUBCONTRACTED

  return (
    <ListingContext.Provider
      value={{
        listings: state.listings,
        listing: state.listing,
        current: state.current,
        error: state.error,
        setCurrent,
        clearCurrent,
        updateListing,
        addListing,
        getUsersListings,
        deleteListing,
        getUncompletedListings,
        getListing,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
};
export default ListingState;
