import {
  CREATE_BID,
  GETUSERS_BIDS,
  GETLISTING_BIDS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BID,
  DELETE_BID,
  BID_ERROR,
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

    default:
      return state;
  }
};
