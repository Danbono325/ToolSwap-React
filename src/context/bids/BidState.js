import React, { useReducer } from "react";
import axios from "axios";
import BidContext from "./bidContext";
import BidReducer from "./bidReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  CREATE_BID,
  GETUSERS_BIDS,
  GETLISTING_BIDS,
  UPDATE_BID,
  DELETE_BID,
  BID_ERROR,
} from "../types";

const BidState = (props) => {
  const initialState = {
    bids: [],
    error: null,
  };

  const [state, dispatch] = useReducer(BidReducer, initialState);

  return (
    <BidContext.Provider
      value={{
        bids: state.bids,
        error: state.error,
      }}
    >
      {props.children}
    </BidContext.Provider>
  );
};
export default BidState;
