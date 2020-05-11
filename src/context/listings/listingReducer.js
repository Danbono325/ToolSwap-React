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

export default (state, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        loading: false,
      };
    case GET_LISTING:
      return {
        ...state,
        listing: action.payload,
        loading: false,
      };
    case ADD_LISTING:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case DELETE_LISTING:
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.listingID !== action.payload
        ),
        loading: false,
      };
    case UPDATE_LISTING:
      return {
        ...state,
        listings: state.listings.map((listing) =>
          listing.listingID === action.payload.listingID
            ? action.payload
            : listing
        ),
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
    case LISTING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_LISTINGS:
      return {
        ...state,
        listings: null,
        listing: null,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
