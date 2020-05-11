import {
  CREATE_BID,
  GETUSERS_BIDS,
  GETLISTING_BIDS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BID,
  DELETE_BID,
  BID_ERROR,
  CLEAR_BIDS,
  RESET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_BID:
      return {
        ...state,
        returnMessage: action.payload,
      };
    case GETLISTING_BIDS:
    case GETUSERS_BIDS:
      return {
        ...state,
        bids: action.payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_BID:
      return {
        ...state,
        bids: state.bids.map((bid) =>
          bid.bidID === action.payload.bidID ? action.payload : bid
        ),
      };
    case DELETE_BID:
      return {
        ...state,
        bids: state.bids.filter((bid) => bid.bidID !== action.payload),
      };
    case CLEAR_BIDS:
      return {
        ...state,
        bids: null,
        bid: null,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BID_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
