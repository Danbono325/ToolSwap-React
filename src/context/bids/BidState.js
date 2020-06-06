import React, { useReducer } from "react";
import axios from "axios";
import BidContext from "./bidContext";
import BidReducer from "./bidReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  CREATE_BID,
  GETUSERS_BIDS,
  GETLISTING_BIDS,
  SET_CURRENT,
  UPDATE_BID,
  DELETE_BID,
  BID_ERROR,
  CLEAR_CURRENT,
  CLEAR_BIDS,
  RESET_LOADING,
} from "../types";

const BidState = (props) => {
  const initialState = {
    bids: [],
    bid: {},
    current: null,
    returnMessage: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(BidReducer, initialState);

  const createBid = async (bid, user_id, listing_id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // try {
    const res = await axios.post(
      `/bid/create.php?user_id=${user_id}&listing_id=${listing_id}`,
      bid,
      config
    );
    if (res.data.Message === "Bid Created") {
      dispatch({ type: CREATE_BID, payload: res.data.Message });
    } else {
      dispatch({ type: BID_ERROR, payload: res.data.Message });
    }
  };

  const getUsersBids = async (user_id) => {
    resetLoading();

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get(`/bid/readUsersBids.php?user_id=${user_id}`);

    if (res.data.data) {
      dispatch({ type: GETUSERS_BIDS, payload: res.data.data });
    } else {
      dispatch({
        type: BID_ERROR,
        payload: "Trouble loading bids, try again.",
      });
    }
  };

  const getListingsBids = async (user_id, listing_id) => {
    resetLoading();

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get(
      `/bid/readListingBids.php?user_id=${user_id}&listing_id=${listing_id}`
    );

    if (res.data.data) {
      dispatch({ type: GETLISTING_BIDS, payload: res.data.data });
    } else {
      dispatch({
        type: BID_ERROR,
        payload: "Trouble loading bids, try again.",
      });
    }
  };

  const setCurrent = (bid) => {
    dispatch({ type: SET_CURRENT, payload: bid });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateBid = async (bid, user_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(
      `/bid/update.php?user_id=${user_id}&bid_id=${bid.bidID}`,
      bid,
      config
    );
    if (res.data.Message === "Bid Updated") {
      dispatch({
        type: UPDATE_BID,
        payload: { bid: bid, Message: res.data.Message },
      });
    } else {
      dispatch({ type: BID_ERROR, payload: res.data.Message });
    }
  };

  const deleteBid = async (user_id, bid_id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.delete(
      `/bid/delete.php?user_id=${user_id}&bid_id=${bid_id}`
    );

    if (res.data.Message === "Bid Deleted") {
      dispatch({
        type: DELETE_BID,
        payload: { id: bid_id, Message: res.data.Message },
      });
    } else {
      dispatch({ type: BID_ERROR, payload: res.data.Message });
    }
  };

  const clearBids = () => {
    dispatch({ type: CLEAR_BIDS });
  };

  const resetLoading = () => dispatch({ type: RESET_LOADING });

  return (
    <BidContext.Provider
      value={{
        bids: state.bids,
        bid: state.bid,
        current: state.current,
        returnMessage: state.returnMessage,
        loading: state.loading,
        error: state.error,
        createBid,
        getUsersBids,
        getListingsBids,
        deleteBid,
        setCurrent,
        clearCurrent,
        updateBid,
        clearBids,
      }}
    >
      {props.children}
    </BidContext.Provider>
  );
};
export default BidState;
