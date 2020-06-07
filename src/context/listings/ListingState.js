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
  CLEAR_LISTINGS,
  RESET_LOADING,
} from "../types";

const ListingState = (props) => {
  const initialState = {
    listings: null,
    listing: {},
    current: null,
    loading: true,
    returnMessage: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ListingReducer, initialState);

  // GET LISTING DETAILS
  const getListing = async (id) => {
    resetLoading();

    try {
      const res = await axios.get(`/listing/readListing.php?listing_id=${id}`);

      dispatch({ type: GET_LISTING, payload: res.data["data"][0] });
      return res.data.data[0];
    } catch (err) {
      dispatch({ type: LISTING_ERROR, payload: err.response });
    }
  };

  // ADD LISTING
  const addListing = async (listing, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/listing/create.php?user_id=${id}`,
      listing,
      config
    );

    if (res.data.Message === "Listing Created") {
      dispatch({ type: ADD_LISTING, payload: res.data });
    } else {
      dispatch({ type: LISTING_ERROR, payload: res.data.Message });
    }

    getUsersListings(id);
  };

  // SET CURRENT
  const setCurrent = (listing) => {
    dispatch({ type: SET_CURRENT, payload: listing });
  };

  // EDIT/UPDATE LITING
  const updateListing = async (listing, user_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // UPDATE ON BACKEND
    const res = await axios.put(
      `/listing/update.php?user_id=
          ${user_id}
          &listing_id=
          ${listing.listingID}`,
      listing,
      config
    );

    if (res.data.Message === "Listing Updated") {
      dispatch({ type: UPDATE_LISTING, payload: res.data });
    } else {
      dispatch({ type: LISTING_ERROR, payload: res.data.Message });
    }
  };

  // CLEAR FORM
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // GET ALL UNCOMPLETED LISTINGS
  const getUncompletedListings = async () => {
    resetLoading();
    // Get all Uncompleted Listings for Home page
    const res = await axios.get(`/listing/readUncompleted.php`);

    dispatch({ type: GET_LISTINGS, payload: res.data.data });
  };

  // GET USER'S LISTINGS
  const getUsersListings = async (id) => {
    resetLoading();

    // Get All Users Listings from backend (id)
    const res = await axios.get(`/listing/readUsersListings.php?user_id=${id}`);

    //Alter Dispatch
    dispatch({ type: GET_LISTINGS, payload: res.data.data });
  };

  // UPDATE LISTING AS COMPLETED
  const updateCompleted = async (iduser, id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Update as Complete ON BACKEND
    const res = await axios.put(
      `/listing/updateAsComplete.php?user_id=${iduser}&listing_id=${id}`
    );

    if (res.data.Message === "Listing Updated as Complete") {
      dispatch({
        type: UPDATE_ASCOMPLETED,
        payload: { id: id, Message: res.data.Message },
      });
    } else {
      dispatch({ type: LISTING_ERROR, payload: res.data.Message });
    }
  };

  // DELETE LISTING
  const deleteListing = async (iduser, idlisting) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // DELETE ON BACKEND
    const res = await axios.delete(
      `/listing/delete.php?user_id=${iduser}&listing_id=${idlisting}`
    );

    if (res.data.Message === "Listing Deleted") {
      dispatch({
        type: DELETE_LISTING,
        payload: { id: idlisting, Message: res.data.Message },
      });
    } else {
      dispatch({ type: LISTING_ERROR, payload: res.data.Message });
    }
  };

  const clearListings = () => {
    dispatch({ type: CLEAR_LISTINGS });
  };

  const resetLoading = () => dispatch({ type: RESET_LOADING });

  // UPDATE LISTING AS SUBCONTRACTED

  return (
    <ListingContext.Provider
      value={{
        listings: state.listings,
        listing: state.listing,
        current: state.current,
        loading: state.loading,
        returnMessage: state.returnMessage,
        error: state.error,
        setCurrent,
        clearCurrent,
        updateListing,
        addListing,
        getUsersListings,
        deleteListing,
        getUncompletedListings,
        updateCompleted,
        getListing,
        clearListings,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
};
export default ListingState;
