import React, { useContext } from "react";
import BidItem from "../bids/BidItem";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import BidContext from "../../context/bids/bidContext";

const BidList = ({ bidState, showButtons }) => {
  const bidContext = useContext(BidContext);

  const { bids, loading } = bidContext;

  if (bids !== null && bids.length === 0 && !loading) {
    return <h4 style={{ textAlign: "center" }}>No bids yet.</h4>;
  }

  return bids !== null && !loading ? (
    bidState.map((bid) => (
      <BidItem key={bid.bidID} bid={bid} showButtons={showButtons} />
    ))
  ) : (
    <Spinner />
  );
};
BidList.propTypes = {
  showButtons: PropTypes.bool.isRequired,
};
export default BidList;
